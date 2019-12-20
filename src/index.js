import React, { useReducer, createContext, useContext } from 'react'

const storesMap = {}
const contextsMap = {}

const useModel = (initState) => {
  const reducer = (state, action = {}) => action.state
  const [state, dispatch] = useReducer(reducer, initState)
  let cacheState = null
  const setState = newState => {
    if (newState === null || typeof newState !== 'object') {
      console.error(`setState传值不正确，请传入对象格式`)
      return
    }
    cacheState = cacheState || { ...state }
    Object.assign(cacheState, newState)
    return Promise.resolve().then(() => {
      if (cacheState) {
        dispatch({ type: 'default', state: cacheState })
        cacheState = null
      }
      return state
    })
  }
  return [state, setState]
}

const StoreProvider = ({ children, context, store }) => {
  const [state, setState] = useModel(store.initialState)
  store.state = state // 将state绑定到store上
  store.setState = setState // 将setState绑定到store上
  return <context.Provider value={state}>
    {children}
  </context.Provider>
}

export const Provider = ({ children, ...stores }) => {
  const keys = Object.keys(stores)

  if (!keys || !keys.length) {
    console.error('未绑定状态到Provider')
    return children
  }

  const renderProvider = (preKeys) => {
    const key = preKeys[0]
    const nextKeys = preKeys.slice(1)
    const store = stores[key]
    const context = createContext()

    storesMap[key] = store
    contextsMap[key] = context

    return <StoreProvider context={context} store={store}>
      {nextKeys.length > 0 ? renderProvider(nextKeys) : children}
    </StoreProvider>
  }

  return renderProvider(keys)
}

// 函数组件内使用
export const useStore = (key) => {
  const context = contextsMap[key]
  if (!context) {
    throw new Error(`useStore 传参有误，找不到${key}`)
  }
  useContext(context)
  return storesMap[key]
}

// 类组件内使用
export const inject = (...keys) => WrapComponent => ({ children, ...props }) => {
  const storeProps = {}
  keys.forEach(key => storeProps[key] = useStore(key))
  return <WrapComponent {...props} {...storeProps}>
    {children}
  </WrapComponent>
}

export default { Provider, useStore, inject }
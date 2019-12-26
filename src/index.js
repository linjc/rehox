import React, { useReducer, useEffect } from 'react'

// 初始化store
const initStore = store => {
  const keys = Object.keys(store)
  keys.forEach(key => {
    if (typeof store[key] === 'function') {
      store[key] = store[key].bind(store) // 将方法内的this指向store
    }
  })
}

// 创建store hooks
export const createStore = store => {
  initStore(store)
  const events = new Set()
  const useStore = () => {
    const reducer = (state, action) => action.state
    const [state, dispatch] = useReducer(reducer, store.state)
    const dispatchEvent = newState => dispatch({ type: 'default', state: newState })
    useEffect(() => {
      events.add(dispatchEvent)
      return () => events.delete(dispatchEvent)
    }, [state])
    return { ...store, state }
  }
  store.setState = (newState) => {
    if (newState === null || typeof newState !== 'object') {
      console.error('setState 传参有误，请传入对象格式')
      return
    }
    const data = { ...Object.assign(store.state, newState) }
    events.forEach(fn => fn(data))
  }
  return useStore
}

// 兼容类组件
export const inject = stores => WrapComponent => ({ children, ...props }) => {
  const storeProps = {}
  if (stores !== null && typeof stores === 'object') {
    for (let key in stores) {
      if (typeof stores[key] === 'function') {
        storeProps[key] = stores[key]()
      } else {
        console.error('请传入使用createStore创建的store hooks')
      }
    }
  } else {
    console.error(`
      inject 传参有误，请传入对象格式：
      { 
        key1: useStore1,
        key2: useStore2,
        ...
      }
      key：命名随意，用于this.props.xxx取对应store
      useStore：通过createStore创建的store hooks
    `)
  }
  return <WrapComponent {...props} {...storeProps}>
    {children}
  </WrapComponent>
}

export default { createStore, inject }
import React, { useReducer, useEffect } from 'react'

export const createStore = store => {
  const events = new Set()
  const useStore = () => {
    const reducer = (state, action) => action.state
    const [state, dispatch] = useReducer(reducer, store.state)
    const dispatchEvent = (newState) => dispatch({ type: 'default', state: newState })
    useEffect(() => {
      events.add(dispatchEvent)
      return () => {
        events.delete(dispatchEvent)
      }
    }, [state])
    return { ...store, state }
  }
  store.setState = (newState) => {
    if(newState === null || typeof newState !== 'object') {
      console.error('setState 传参有误，请传入对象格式')
      return
    }
    const data = { ...Object.assign(store.state, newState) }
    events.forEach(fn => fn(data))
  }
  return useStore
}

export const inject = stores => WrapComponent => ({ children, ...props }) => {
  const storeProps = {}
  if (stores !== null && typeof stores === 'object') {
    for (let key in stores) {
      if (typeof stores[key] === 'function') {
        storeProps[key] = stores[key]()
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
      key：命名随意，用于类组件读取store：this.props.xxx
      useStore：通过createStore创建的store hooks
    `)
  }
  return <WrapComponent {...props} {...storeProps}>
    {children}
  </WrapComponent>
}

export default { createStore, inject }
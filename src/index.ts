import { useReducer, useEffect } from 'react'
import inject from './inject'

// 初始化store方法this指向
const initStoreActions = (store: Record<any, any>) => {
  for (let key in store) {
    if (typeof store[key] === 'function') {
      store[key] = store[key].bind(store)
    }
  }
}

// 获取store状态
const getStoreState = (store: Record<any, any>) => {
  const state: Record<any, any> = {}
  for (let key in store) {
    if (typeof store[key] !== 'function') {
      state[key] = store[key]
    }
  }
  return state
}

// 创建store hook
const createStore = (store: Record<any, any>) => {
  initStoreActions(store)
  const events = new Set()
  let storeState = getStoreState(store)
  const useStore = () => {
    const reducer = (state: any, action: any) => action.state
    const [state, dispatch] = useReducer(reducer, storeState)
    useEffect(() => {
      const dispatchEvent = (newState: any) => dispatch({ type: 'default', state: newState })
      events.add(dispatchEvent)
      return () => {
        events.delete(dispatchEvent)
      }
    }, [])
    return { ...store, ...state }
  }
  store.setState = (newState: any) => {
    if (newState === null || typeof newState !== 'object') {
      console.error('setState 传参有误，请传入对象格式')
      return
    }
    Object.assign(store, newState) // 同步修改store内字段，用于读取最新状态
    storeState = getStoreState(store)
    events.forEach((fn: Function) => fn(storeState))
  }
  return useStore
}

export { createStore, inject }

export default { createStore, inject }
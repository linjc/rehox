import { useReducer, useEffect } from 'react'
import inject from './inject'

// 初始化store
const initStore = (store: Record<any, any>) => {
  const keys = Object.keys(store)
  const state: Record<any, any> = {}
  keys.forEach(key => {
    if (typeof store[key] === 'function') {
      store[key] = store[key].bind(store) // 将方法内的this指向store
    } else {
      state[key] = store[key] // 提取除方法外的字段作为state
    }
  })
  return state
}

// 创建store hook
export const createStore = (store: Record<any, any>) => {
  const events = new Set()
  const storeState = initStore(store)
  const useStore = () => {
    const reducer = (state: any, action: any) => action.state
    const [state, dispatch] = useReducer(reducer, storeState)
    const dispatchEvent = (newState: any) => dispatch({ type: 'default', state: newState })
    useEffect(() => {
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
    const data = { ...Object.assign(storeState, newState) }
    events.forEach((fn: Function) => fn(data))
  }
  return useStore
}

export default { createStore, inject }
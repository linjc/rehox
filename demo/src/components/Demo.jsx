import React from 'react'
import useThemeStore from '../stores/useThemeStore'
import useAuthStore from '../stores/useAuthStore'

export default function () {
  const themeStore = useThemeStore()
  const authStore = useAuthStore()

  const onclick = () => {
    themeStore.setName()
    themeStore.setAge()
    authStore.setName()
    authStore.setAge()
  }

  return <div>
    <h3>函数组件</h3>
    <button onClick={onclick}>更改数据</button>
    <div>{themeStore.state.name}</div>
    <div>{themeStore.state.age}</div>
    <div>{authStore.state.name}</div>
    <div>{authStore.state.age}</div>
  </div>
}
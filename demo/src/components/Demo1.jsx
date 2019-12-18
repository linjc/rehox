import React from 'react'
import { useStore } from 'rehox'

export default function () {
  const themeStore = useStore('themeStore')
  const authStore = useStore('authStore')

  const onclick = () => {
    themeStore.setName('Theme' + Math.random())
    authStore.setName()
  }

  React.useEffect(() => {
    console.log('Demo1 更新啦')
  })

  return <div>
    <button onClick={onclick}>Demo1点击</button>
    <div>{themeStore.state.name}</div>
    <div>{authStore.state.name}</div>
  </div>
}
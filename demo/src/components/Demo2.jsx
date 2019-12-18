import React from 'react'
import { useStore } from 'rehox'

export default function () {
  const authStore = useStore('authStore')

  const onclick = () => {
    authStore.setName()
  }

  React.useEffect(() => {
    console.log('Demo2 更新啦')
  })

  return <div>
    <button onClick={onclick}>Demo2点击</button>
    <div>{authStore.state.name}</div>
  </div>
}
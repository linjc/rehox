import React from 'react'
import useUIStore from '../stores/useUIStore'
import useUserStore from '../stores/useUserStore'

export default function () {

  const {
    name,
    deptName,
    corpName,
    onChangeUserInfo,
  } = useUserStore()

  const {
    update: updateUIState,
    language,
    theme,
    onChangeLang
  } = useUIStore()

  const handleChangeUI = () => {
    onChangeLang()
    updateUIState({
      theme: '#' + Math.random().toString(16).slice(-6)
    })
  }

  return <div style={{marginLeft: 20, width: 360}}>
    <h3>函数组件</h3>
    <button onClick={onChangeUserInfo}>更改用户</button>
    <div>姓名：{name}</div>
    <div>公司：{corpName}</div>
    <div>部门：{deptName}</div>
    <br />
    <button onClick={handleChangeUI}>更改UI</button>
    <div>语言：{language}</div>
    <div>主题：{theme}</div>
  </div>
}

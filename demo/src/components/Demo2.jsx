import React, { Component } from 'react'
import { inject } from 'rehox'
import useUIStore, { uiStore } from '../stores/useUIStore'
import useUserStore, { userStore } from '../stores/useUserStore'

class Demo3 extends Component {

  handleChangeUI = () => {
    uiStore.onChangeLang()
    uiStore.update({
      theme: '#' + Math.random().toString(16).slice(-6)
    })
  }

  render() {

    const {
      name,
      deptName,
      corpName,
      onChangeUserInfo,
    } = userStore

    const { language, theme } = uiStore

    return <div>
      <h3>类组件</h3>
      <button onClick={onChangeUserInfo}>更改用户</button>
      <div>姓名：{name}</div>
      <div>公司：{corpName}</div>
      <div>部门：{deptName}</div>
      <br />
      <button onClick={this.handleChangeUI}>更改UI</button>
      <div>语言：{language}</div>
      <div>主题：{theme}</div>
    </div>
  }
}

export default inject({
  uiStore: useUIStore,
  userStore: useUserStore,
})(Demo3)

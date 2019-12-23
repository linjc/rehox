import React, { Component } from 'react'
import { inject } from 'rehox'
import useThemeStore from '../stores/useThemeStore'
import useAuthStore from '../stores/useAuthStore'

class Demo3 extends Component {

  onclick = () => {
    const themeStore = this.props.themeStore
    const authStore = this.props.authStore
    themeStore.setName()
    themeStore.setAge()
    authStore.setName()
    authStore.setAge()
  }

  render() {
    const themeStore = this.props.themeStore
    const authStore = this.props.authStore

    return <div>
      <h3>类组件</h3>
      <button onClick={this.onclick}>更改数据</button>
      <div>{themeStore.state.name}</div>
      <div>{themeStore.state.age}</div>
      <div>{authStore.state.name}</div>
      <div>{authStore.state.age}</div>
    </div>
  }
}

export default inject({
  themeStore: useThemeStore,
  authStore: useAuthStore,
})(Demo3)
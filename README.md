### 安装
``` js
npm i rehox --save
```


### 定义store
store是一个对象，包含状态字段和方法，store通过createStore创建后注入update方法，用于触发组件更新。
注：update名可自定义，createStore第二个参数传入自定义名称即可，如createStore(store, 'updateRender')，则改用this.updateRender()触发组件更新。
``` js
import { createStore } from "rehox"

const store = {

  name: '李狗蛋',
  deptName: '质检部',
  corpName: '富土康化肥厂',

  setName() {
    this.name = '李狗蛋' + Math.random()
    this.update()
    /** 或者
      this.update({ name: '李狗蛋' + Math.random() })
    */
  },

  onChangeUserInfo() {
    this.name = '李狗蛋' + Math.random()
    this.deptName = '质检部' + Math.random()
    this.corpName = '富土康化肥厂' + Math.random()
    this.update()
    /** 或者
      this.update({
        name: '李狗蛋' + Math.random(),
        deptName: '质检部' + Math.random(),
        corpName: '富土康化肥厂' + Math.random(),
      })
    */
  },

}

export default createStore(store)
```


### 函数组件内使用
``` js
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
```


### 类组件内使用
``` js
import React, { Component } from 'react'
import { inject } from 'rehox'
import useUIStore from '../stores/useUIStore'
import useUserStore from '../stores/useUserStore'

class Demo extends Component {

  handleChangeUI = () => {
    const uiStore = this.props.uiStore
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
    } = this.props.userStore
  
    const { language, theme } = this.props.uiStore

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
/*
 * 通过inject向类组件注入store，参数为对象格式
 * key：命名随意，用于类组件读取store：this.props.xxx
 * useStore：通过createStore创建的store hooks
*/
export default inject({
  uiStore: useUIStore,
  userStore: useUserStore,
})(Demo)
```


### 快捷链接

- [Demo示例](https://github.com/linjc/rehox/tree/master/demo)
- [Github仓库](https://github.com/linjc/rehox)
- [Gitee仓库](https://gitee.com/l2j2c3/rehox)
- [NPM包地址](https://www.npmjs.com/package/rehox)
- [Issues反馈](https://github.com/linjc/rehox/issues)

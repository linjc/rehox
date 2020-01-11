### 安装
``` js
npm i rehox --save
```


### 定义store
store是一个对象，包含状态字段和方法，store通过createStore创建后注入setState方法，用于更新修改状态
【注意：不推荐使用箭头函数定义方法，this将不是当前store对象】
``` js
import { createStore } from "rehox"

const store = {
  // setState: Function, 【自动注入，不要手动覆盖】

  name: 'Auth',
  age: 10,

  // this指向当前store对象
  setName() {
    this.setState({name: 'Auth' + Math.random()})
  },

  // 【不推荐】箭头函数this非指向当前store对象
  setAge: () => {
    console.log(this) // undefined
    store.setState({age: 0 | Math.random()*30})
  },
}

export default createStore(store)
```


### 函数组件内使用
``` js
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
    <button onClick={onclick}>更改数据</button>
    <div>{themeStore.name}</div>
    <div>{themeStore.age}</div>
    <div>{authStore.name}</div>
    <div>{authStore.age}</div>
  </div>
}
```


### 类组件内使用
``` js
import React, { Component } from 'react'
import { inject } from 'rehox'
import useThemeStore from '../stores/useThemeStore'
import useAuthStore from '../stores/useAuthStore'

class Demo extends Component {

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
      <button onClick={this.onclick}>更改数据</button>
      <div>{themeStore.name}</div>
      <div>{themeStore.age}</div>
      <div>{authStore.name}</div>
      <div>{authStore.age}</div>
    </div>
  }
}
/*
 * 通过inject向类组件注入store，参数为对象格式
 * key：命名随意，用于类组件读取store：this.props.xxx
 * useStore：通过createStore创建的store hooks
*/
export default inject({
  themeStore: useThemeStore,
  authStore: useAuthStore,
})(Demo)
```


### 快捷链接

- [Demo示例](https://github.com/linjc/rehox/tree/master/demo)
- [Github仓库](https://github.com/linjc/rehox)
- [Gitee仓库](https://gitee.com/l2j2c3/rehox)
- [NPM包地址](https://www.npmjs.com/package/rehox)
- [Issues反馈](https://github.com/linjc/rehox/issues)

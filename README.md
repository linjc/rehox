### 安装
``` js
npm i rehox --save
```


### API

* `createStore(obj))` - 创建store，实际返回一个hooks
* `inject({ key1: useStore1, key2: useStore2 })(ClassComponent)` - 类组件注入store，key名随意取，使用this.props.xxx即可读取对应store
* `setState(obj)` - 更新状态函数（自动绑定在store上），只传入需要修改的状态就行，会自动与当前state合并后更新


### 定义store
store是一个对象，包含状态字段和方法，store通过createStore创建后注入setState方法，用于更新修改状态
【注意：如果使用箭头函数定义方法，方法内不能使用this】
``` js
import { createStore } from "rehox"

const store = {
  // setState: Function, 【自动注入，不要手动覆盖】

  name: 'Auth',
  age: 10,

  // 非箭头函数：this指向当前对象
  setName() {
    this.setState({name: 'Auth' + Math.random()})
  },

  // 箭头函数内不能使用this
  setAge: () => {
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

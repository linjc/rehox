### 简介
实现React跨页面跨组件通信的方式有多种，如使用React提供的context，或使用flux、redux、mobx等第三方提供的库。而在React v16.8推出Hook之后，基于Hook可以很轻松地实现一个状态管理库。

### rehox
利用React提供自定义Hook能力，我实现了一个全局状态管理库rehox（命名参考redux）。以下为实现代码，仅20行，非常的简洁。
```ts
import { useEffect, useState } from 'react'

const createStore = (store, updateName = 'update') => {
  const events = new Set()
  store[updateName] = (data) => {
    Object.assign(store, data)
    events.forEach(fn => fn())
  }
  return () => {
    const [, forceUpdate] = useState({})
    useEffect(() => {
      const updateEvent = () => forceUpdate({})
      events.add(updateEvent)
      return () => events.delete(updateEvent)
    }, [])
    return store
  }
}

export default createStore;
```
以上代码导出一个createStore方法，该方法有两个参数，其中store为存储全局状态的对象，updateName为触发更新的函数名称（默认update）。使用createStore方法可以生成一个自定义Hook函数，这个Hook函数在使用时返回store对象。下面介绍具体安装和使用。

### 安装

```bash
npm install rehox
# 或
yarn add rehox
```

或直接拷贝[src](./src)的文件到项目中使用


### 定义store
store是一个对象，包含状态字段和方法，store通过createStore创建后注入update方法，用于触发组件更新。update名可自定义，createStore第二个参数传入自定义名称即可，如createStore(store, 'updateRender')，则改用this.updateRender()触发组件更新。
注意：createStore方法第二参数会作为更新函数绑定到store对象上，所以store对象不要定义同名属性，避免覆盖。
``` js
// useStore.js
import { createStore } from "rehox"

class Store {
  name = '李狗蛋'
  deptName = '质检部'
  corpName = '富土康化肥厂'

  setName = () => {
    this.name = '李狗蛋' + Math.random()
    this.update()
    /** 或者
      this.update({ name: '李狗蛋' + Math.random() })
    */
  }

  onChangeUserInfo = () => {
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
  }
}

export const store = new Store()

export default createStore(store)
```


### 函数组件内使用
``` js
// Demo.jsx
import React from 'react'
import useStore from '../stores/useStore'

export default function () {

  const { name, deptName, corpName, onChangeUserInfo } = useStore() // Store Hook

  return <div style={{marginLeft: 20, width: 360}}>
    <h3>函数组件</h3>
    <button onClick={onChangeUserInfo}>更改用户</button>
    <div>姓名：{name}</div>
    <div>公司：{corpName}</div>
    <div>部门：{deptName}</div>
  </div>
}
```


### 类组件内使用
``` js
import React, { Component } from 'react'
import { inject } from 'rehox'
import useStore, { store } from '../stores/useStore'

class Demo extends Component {
  render() {

    const { name, deptName, corpName, onChangeUserInfo } = this.props.store
    // 类组件内也可以直接使用import引入的store
    // const { name, deptName, corpName, onChangeUserInfo } = store
 
    return <div>
      <h3>类组件</h3>
      <button onClick={onChangeUserInfo}>更改用户</button>
      <div>姓名：{name}</div>
      <div>公司：{corpName}</div>
      <div>部门：{deptName}</div>
    </div>
  }
}
/*
 * 通过inject向类组件注入store，参数为对象格式
 * key：自定义名称xxx，用于类组件读取：this.props.xxx
 * useStore：通过createStore创建的store hook
*/
export default inject({
  store: useStore,
  // store1: useStore1
})(Demo)
```


### 快捷链接

- [Demo示例](./demo)
- [Github仓库](https://github.com/linjc/rehox)
- [Gitee仓库](https://gitee.com/l2j2c3/rehox)
- [Issues反馈](./issues)

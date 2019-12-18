### 安装
``` js
npm i rehox --save
```


### API
API只有三个，无使用难度

* Provider 绑定store的组件，在根组件使用，仅使用一次
* useStore(name) 函数组件使用，name：store的别名，即绑定在Provider组件上的属性名
* inject(name, name2, ...)(ClassComponent) 类组件组件


### 定义store
store通过Provider组件绑定后会自动注入state和setState属性，state用于渲染和读取，setState用于更新state。注：不要直接更改state
``` js
//  stores/themeStore.js

class Store {
  // state, // 【自动注入，不要手动覆盖】
  // setState, //  【自动注入，不要手动覆盖】

  // 初始化状态，初始值在这里设置
  initialState = {
    name: 'Theme',
    datas: []
  }

  setName(name) { // 更新state
    const state = { 
      ...this.state,
      name
    }
    this.setState(state)
  }
}

export default new Store()
```


### 注入store，可以多个
``` js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'rehox'
import themeStore from './stores/themeStore'
import authStore from './stores/authStore'

ReactDOM.render(
  <Provider themeStore={themeStore} authStore={authStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```


### 函数组件内使用
``` js
// components/Demo1.jsx

import React from 'react'
import { useStore } from 'rehox'

export default function () {
  const themeStore = useStore('themeStore')

  const handleChangeName = () => {
    themeStore.setName(Math.random())
  }

  return <div>
    <button onClick={handleChangeName}>更改数据</button>
    <div>{themeStore.state.name}</div>
  </div>
}
```


### 类组件内使用
``` js
// components/Demo3.jsx
import React from 'react'
import { inject } from 'rehox'

class Demo3 extends React.Component{

  onclick = () => {
    this.props.themeStore.setName(Math.random())
  }

  render () {
    const { authStore, themeStore } = this.props
    
    return <div>
      <button onClick={this.onclick}>Demo3点击</button>
      <div>{authStore.state.name}</div>
      <div>{themeStore.state.name}</div>
    </div>
  }
}

export default inject('authStore', 'themeStore')(Demo3)
```


### 快捷链接

- [Demo示例](https://github.com/linjc/rehox/tree/master/demo)
- [Github仓库](https://github.com/linjc/rehox)
- [Gitee仓库](https://gitee.com/l2j2c3/rehox)
- [NPM包地址](https://www.npmjs.com/package/rehox)
- [Issues反馈](https://github.com/linjc/rehox/issues)

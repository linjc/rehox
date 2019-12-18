
#### 定义store
``` js
//  stores/themeStore.js

class Store {
  // state, // store绑定到Provider后会自动注入，用于渲染和读取【默认字段，不要手动覆盖】
  // setState, // store绑定到Provider后会自动注入，用于更新状态【默认字段，不要手动覆盖】

  // 初始化状态，初始值在这里设置
  initialState = {
    name: 'Theme',
    datas: []
  }

  setName(name) {
    const state = { ...this.state }
    state.name = name
    this.setState(state) // 更新state
  }
}

export default new Store()
```



#### 入口注入store，可以多个
``` js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './lib/store'
import themeStore from './stores/themeStore'
import authStore from './stores/authStore'

ReactDOM.render(
  <Provider themeStore={themeStore} authStore={authStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```



#### 函数组件内使用
``` js
// components/Demo1.jsx

import React from 'react'
import { useStore } from '../lib/store'

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



#### 类组件内使用
``` js
// components/Demo3.jsx
import React from 'react'
import { inject } from '../lib/store'

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

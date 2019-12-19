### 安装
``` js
npm i rehox --save
```


### API

* Provider - 绑定store的组件，在根组件使用，仅使用一次
* useStore(name) - 函数组件使用，返回对应store，参数name为store的别名，即绑定在Provider组件上的属性名
* inject(name, name2, ...)(ClassComponent) - 类组件注入store，通过this.props.xxx可取到对应store
* state - 状态值（自动绑定在store上），用于页面渲染和读取
* setState(obj) - 更新状态函数（自动绑定在store上），只传入需要修改的状态就行，会自动与当前state合并后更新，和类组件的setState有点类似


### 定义store
在initialState定义状态字段和设置初始值，store通过Provider组件绑定后会自动注入state和setState属性，state用于渲染和读取，setState用于更新修改state。【注：状态值通过setState修改，不要直接更改state】
``` js
//  stores/themeStore.js

class Store {
  // state, // 【自动注入，不要手动覆盖】
  // setState, //  【自动注入，不要手动覆盖】

  // 初始化状态，初始值在这里设置
  initialState = {
    name: 'Theme',
    age: 10,
    datas: [],
  }

  setName(name) {
    this.setState({name: name})
  }
  
  setAge(age) {
    this.setState({age: age})
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

  const handleChange = () => {
    themeStore.setName(Math.random())
    themeStore.setAge(0 | Math.random() * 30)
  }

  return <div>
    <button onClick={handleChange}>更改数据</button>
    <div>{themeStore.state.name}</div>
    <div>{themeStore.state.age}</div>
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

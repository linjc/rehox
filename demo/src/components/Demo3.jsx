import React from 'react'
import { inject } from 'rehox'

class Demo3 extends React.Component {

  componentDidMount() {
    console.log('Demo3更新啦')
  }

  componentWillUpdate() {
    console.log('Demo3更新啦')
  }

  onclick = () => {
    this.props.themeStore.setName('Theme' + Math.random())
  }

  render() {
    const { state } = this.props.themeStore

    return <div>
      <button onClick={this.onclick}>Demo3点击</button>
      <div>{state.name}</div>
    </div>
  }
}

export default inject('themeStore')(Demo3)
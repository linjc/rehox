
class Store {
  // 初始值在这里设置
  initialState = {
    name: 'Auth'
  }
  
  setName(data) {
    const state = { ...this.state }
    state.name = 'Auth' + Math.random()
    this.setState(state)
  }
}

export default new Store()
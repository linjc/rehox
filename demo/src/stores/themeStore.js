
class Store {
  // 初始值在这里设置
  initialState = {
    name: 'Theme'
  }

  setName(name) {
    const state = { ...this.state }
    state.name = name || 'Theme'
    this.setState(state)
  }
}

export default new Store()
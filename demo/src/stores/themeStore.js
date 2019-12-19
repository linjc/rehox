
class Store {
  // state, // 【自动注入，不要手动覆盖】
  // setState, //  【自动注入，不要手动覆盖】
  
  // 初始值在这里设置
  initialState = {
    name: 'Theme'
  }

  setName(name) {
    this.setState({ name: name || 'Theme' })
  }
}

export default new Store()
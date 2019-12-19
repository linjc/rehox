
class Store {
  // state, // 【自动注入，不要手动覆盖】
  // setState, //  【自动注入，不要手动覆盖】
  
  // 初始值在这里设置
  initialState = {
    name: 'Auth'
  }

  setName(data) {
    this.setState({ name: 'Auth' + Math.random() })
  }
}

export default new Store()
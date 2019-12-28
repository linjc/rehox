import { createStore } from "rehox"

const store = {
  
  name: 'Theme',
  age: 10,

  setName() {
    this.setState({ name: 'Theme' + Math.random() })
  },

  setAge() {
    this.setState({ age: 0 | Math.random() * 30 })
  },
}

export default createStore(store)
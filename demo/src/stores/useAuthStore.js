import { createStore } from "rehox"

const store = {
  state: {
    name: 'Auth',
    age: 10
  },

  setName() {
    this.setState({ name: 'Auth' + Math.random() })
  },

  setAge() {
    this.setState({ age: 0 | Math.random() * 30 })
  },
}

export default createStore(store)
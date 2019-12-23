import { createStore } from "rehox"

const store = {
  state: {
    name: 'Theme',
    age: 10
  },

  setName() {
    store.setState({ name: 'Theme' + Math.random() })
  },

  setAge() {
    store.setState({ age: 0 | Math.random() * 30 })
  },
}

export default createStore(store)
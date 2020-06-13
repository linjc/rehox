import { createStore } from "rehox"

export const userStore = {
  // setState: Function, 【自动注入，不要手动覆盖】

  name: '李狗蛋',
  deptName: '质检部',
  corpName: '富土康化肥厂',

  setName() {
    this.setState({ name: '李狗蛋' + Math.random() })
  },

  onChangeUserInfo() {
    this.setState({
      name: '李狗蛋' + Math.random(),
      deptName: '质检部' + Math.random(),
      corpName: '富土康化肥厂' + Math.random(),
    })
  },

}

export default createStore(userStore)
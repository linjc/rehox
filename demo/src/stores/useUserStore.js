import { createStore } from "rehox"

export const userStore = {

  name: '李狗蛋',
  deptName: '质检部',
  corpName: '富土康化肥厂',

  setName() {
    this.name = '李狗蛋' + Math.random()
    this.update()
    /** 或者
      this.update({ name: '李狗蛋' + Math.random() })
    */
  },

  onChangeUserInfo() {
    this.name = '李狗蛋' + Math.random()
    this.deptName = '质检部' + Math.random()
    this.corpName = '富土康化肥厂' + Math.random()
    this.update()
    /** 或者
      this.update({
        name: '李狗蛋' + Math.random(),
        deptName: '质检部' + Math.random(),
        corpName: '富土康化肥厂' + Math.random(),
      })
    */
  },

}

export default createStore(userStore)

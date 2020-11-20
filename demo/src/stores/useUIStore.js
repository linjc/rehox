import { createStore } from "rehox"

export const uiStore = {

  language: "zh_cn",
  theme: 'red',

  onChangeLang() {
    this.language = this.language === 'en_US' ? 'zh_cn' : 'en_US'
    this.update()
    /** 或者
      this.update({
        language: this.language === 'en_US' ? 'zh_cn' : 'en_US'
      })
    */
  },

  setTheme(color) {
    this.theme = color || 'blue'
    this.update()
    /** 或者
      this.update({
        theme: color || 'blue'
      })
    */
  },
}

export default createStore(uiStore)

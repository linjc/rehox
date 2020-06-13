import { createStore } from "rehox"

export const uiStore = {

  language: "zh_cn",
  theme: 'red',
  
  onChangeLang() {
    this.setState({
      language: this.language === 'en_US' ? 'zh_cn' : 'en_US'
    })
  },

  setTheme(color) {
    this.setState({ theme: color || 'blue' })
  },
}

export default createStore(uiStore)
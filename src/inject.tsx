import React, { ComponentType } from 'react'

// 兼容类组件
const inject = (stores: Record<any, any>) => (C: ComponentType<any>) => {
  const WrapComponent: ComponentType<any> = (props) => {
    const storeProps: any = {}
    if (stores !== null && typeof stores === 'object') {
      for (let key in stores) {
        if (typeof stores[key] === 'function') {
          storeProps[key] = stores[key]()
        } else {
          console.error('请传入使用createStore创建的store hooks')
        }
      }
    } else {
      console.error(`
        inject 传参有误，请传入对象格式：
        { 
          key1: useStore1,
          key2: useStore2,
          ...
        }
        key：命名随意，用于this.props.xxx取对应store
        useStore：通过createStore创建的store hooks
      `)
    }
    return <C {...props} {...storeProps} />
  }
  return WrapComponent
}

export default inject
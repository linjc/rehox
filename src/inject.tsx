import React, { ComponentType } from 'react';

export type IInjectStore = (stores: Record<any, any>)
  => (C: ComponentType<any>)
    => ComponentType<any>;

export const injectStore: IInjectStore = stores => C => (props: any = {}) => {
  const storeProps: Record<any, any> = {}
  const type = Object.prototype.toString.call(stores)
  if (type === '[object Object]') {
    for (let key in stores) {
      if (typeof stores[key] === 'function') {
        storeProps[key] = stores[key]()
      }
    }
  }
  return <C {...props} {...storeProps} />
}

export default injectStore

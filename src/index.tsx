import React, { useEffect, useState } from 'react';

export type ICreateStore = <T>(store: T, updateName?: string) => () => T;

export const createStore: ICreateStore = (store, updateName = 'update') => {

  const events: Set<Function> = new Set();

  store[updateName] = (data?: Record<any, any>) => {
    if (data) {
      Object.assign(store, data);
    }
    events.forEach(fn => fn())
  }

  Object.keys(store).forEach(key => {
    if (typeof store[key] === 'function') {
      store[key] = store[key].bind(store);
    }
  })

  return () => {
    const [, forceUpdate] = useState({});

    useEffect(() => {
      const updateEvent = () => forceUpdate({});
      events.add(updateEvent);
      return () => {
        events.delete(updateEvent);
      };
    }, []);

    return { ...store }
  }
}

/** 类组件使用【不推荐】
 * 兼容老版本已经在使用的inject函数，建议改为使用手动创建函数组件进行包裹，使用参考样例
 */
export const inject = (stores: any) => (C: any) => (props: any = {}) => {
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

export default { createStore, inject }

import { useEffect, useState } from 'react';

export type ICreateStore = (store: Record<any, any>, updateName?: string) => Function;

function bindStore(store: Record<any, any>) {
  Object.keys(store).forEach(key => {
    if (typeof store[key] === 'function') {
      store[key] = store[key].bind(store);
    }
  })
}

export const createStore: ICreateStore = (store, updateName = 'update') => {

  const events: Set<Function> = new Set();

  store[updateName] = (data?: Record<any, any>) => {
    if (data) {
      Object.assign(store, data);
    }
    events.forEach(fn => fn())
  }

  if (!store.setState) {
    // setState 兼容1.6.0以前版本
    store.setState = (data?: Record<any, any>) => store[updateName](data);
  }

  bindStore(store);

  return () => {
    const [, forceUpdate] = useState({});

    useEffect(() => {
      const updateEvent = () => forceUpdate({});
      events.add(updateEvent);
      return () => {
        events.delete(updateEvent);
      };
    }, []);

    return store
  }
}

export default createStore;

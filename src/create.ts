import { useEffect, useState } from 'react';

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

    return store
  }
}

export default createStore;

import { types, getParent, getEnv } from 'mobx-state-tree';
import requests from './requests';

const Saturn = types
  .model('Saturn')
  .props({})
  .views(self => ({
    get connection() {
      return getParent(self).connection;
    },
  }))
  .actions(self => {
    const { store, isClient } = getEnv(self);
    return {
      afterCreate: () => {
        if (isClient) {
          requests(self);
          if (store)
            store.subscribe(() => {
              const action = store.getState().lastAction;
              if (self[action.type]) {
                self[action.type](action);
              }
            });
        }
      },
    };
  });

export default Saturn;

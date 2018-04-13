import { types, getParent, getEnv } from 'mobx-state-tree';
import requestNextPageInList from './requestNextPageInList';
import requestNextPageInSingle from './requestNextPageInSingle';

const Saturn = types
  .model('Saturn')
  .props({})
  .views(self => ({
    get connection() {
      return getParent(self).connection;
    },
  }))
  .actions(requestNextPageInList)
  .actions(self => {
    const { store, isClient } = getEnv(self);
    return {
      afterCreate: () => {
        if (isClient) {
          requestNextPageInSingle(self);
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

import { types, getParent, getEnv, flow } from 'mobx-state-tree';
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
  .actions(requestNextPageInSingle)
  .actions(self => {
    const { store, isClient } = getEnv(self);
    return {
      requestNextPageInSingleFlow: flow(function* requestNextPageInSingleFlow() {
        while (true) {
          yield self.requestNextPageInSingle(self);
        }
      }),
      afterCreate: () => {
        if (isClient) {
          if (store)
            store.subscribe(() => {
              const action = store.getState().lastAction;
              if (self[action.type]) {
                self[action.type](action);
              }
            });
          self.requestNextPageInSingleFlow();
        }
      },
    };
  });

export default Saturn;

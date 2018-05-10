import { types, getParent, getEnv, flow } from 'mobx-state-tree';
import requestNextPageInList from './requestNextPageInList';
import requestNextPageInSingle from './requestNextPageInSingle';
import Localization from './localization';

const Saturn = types
  .model('Saturn')
  .props({
    localization: types.optional(Localization, {}),
  })
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
      requestNextPages: flow(function* requestNextPages() {
        yield self.requestFirstExtracted();
        while (true) {
          yield self.requestNextPageInSingle();
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
          self.requestNextPages();
        }
      },
    };
  });

export default Saturn;

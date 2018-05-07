import { types, getParent, getEnv, flow } from 'mobx-state-tree';
import requestNextPageInList from './requestNextPageInList';
import requestNextPageInSingle from './requestNextPageInSingle';
import Menu from './menu';
import Cookies from './cookies';
import Comments from './comments';
import Scroll from './scroll';
import Notifications from './notifications';

export default types
  .model('Saturn')
  .props({
    menu: types.optional(Menu, {}),
    cookies: types.optional(Cookies, {}),
    comments: types.optional(types.map(types.map(Comments)), {}),
    scroll: types.optional(Scroll, {}),
    notifications: types.optional(Notifications, {}),
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

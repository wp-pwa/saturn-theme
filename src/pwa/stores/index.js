import { when } from 'mobx';
import { types, getParent, getEnv } from 'mobx-state-tree';
import { dep } from 'worona-deps';

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
    const listRequested = dep('connection', 'actions', 'listRequested');
    const addColumnToContext = dep('connection', 'actions', 'addColumnToContext');

    const requestNextPage = async () => {
      console.log('waiting until last items');

      await when(
        () =>
          self.connection.selectedColumn.index >=
          self.connection.selectedContext.columns.length - 2,
      );
      const { index, columns } = self.connection.selectedContext;
      const { type, id, page } = columns[columns.length - 1].fromList;
      const nextPage = self.connection.entity(type, id).page(page + 1);
      if (!nextPage.ready && !nextPage.fetching)
        store.dispatch(listRequested({ list: { type, id, page: page + 1 } }));
      store.dispatch(
        addColumnToContext({ column: [{ type, id, page: page + 1, extract: 'horizontal' }] }),
      );
      console.log('waiting until list ready or context change');
      await when(() => nextPage.ready || self.connection.selectedContext.index !== index);
      requestNextPage();
    };

    return {
      afterCreate: () => {
        if (isClient) {
          // requestNextPage();
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

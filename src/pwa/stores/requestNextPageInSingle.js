import { when } from 'mobx';
import { getEnv, flow } from 'mobx-state-tree';
import { dep } from 'worona-deps';

const waitFor = ({ actionType, store }) =>
  new Promise(resolve => {
    store.subscribe(() => {
      if (store.getState().lastAction.type === actionType) resolve();
    });
  });

export default self => {
  const { store } = getEnv(self);
  const listRequested = dep('connection', 'actions', 'listRequested');
  const addColumnToContext = dep('connection', 'actions', 'addColumnToContext');

  return {
    requestFirstExtracted: flow(function* requestFirstExtracted() {
      // Wait until sagas are initilizated and client is rendered
      yield waitFor({ store, actionType: 'build/CLIENT_RENDERED' });

      // Check if there are extracted in the context and fetch them if needed
      const pagesToWait = [];
      self.connection.selectedContext.rawColumns.map(column => {
        if (column.hasExtracted('horizontal')) {
          const item = column.rawItems[0];
          if (!item.list.page(item.page).ready && !item.list.page(item.page).fetching) {
            store.dispatch(
              listRequested({ list: { type: item.type, id: item.id, page: item.page } }),
            );
            pagesToWait.push({ list: item.list, page: item.page });
          }
        }
      });
      yield Promise.all(pagesToWait.map(({ list, page }) => when(() => list.page(page).ready)));
    }),
    requestNextPageInSingle: flow(function* requestNextPageInSingle() {
      // Wait until we are in the last two items.
      yield when(
        () =>
          self.connection.selectedColumn.index >=
            self.connection.selectedContext.columns.length - 2 &&
          self.connection.selectedContext.options.bar === 'single',
      );
      // Get the fromList of the last item.
      const { index, columns } = self.connection.selectedContext;
      const { type, id } = columns[columns.length - 1].items[0].fromList;
      // Get the last page added to that list.
      const page = self.connection.list(type, id).total.fetched.pages + 1;
      const nextPage = self.connection.list(type, id).page(page);
      // Ask for the page.
      if (!nextPage.ready && !nextPage.fetching)
        store.dispatch(listRequested({ list: { type, id, page } }));
      // Add it to the context if it's not already there.
      const item = { type, id, page, extract: 'horizontal' };
      if (!self.connection.selectedContext.hasItem({ item }))
        store.dispatch(addColumnToContext({ column: [{ type, id, page, extract: 'horizontal' }] }));
      // Wait until it's ready.
      yield when(
        () =>
          self.connection.list(type, id).page(page).ready ||
          self.connection.selectedContext.index !== index,
      );
    }),
  };
};

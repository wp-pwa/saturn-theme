import { when } from 'mobx';
import { getEnv, flow } from 'mobx-state-tree';
import { dep } from 'worona-deps';

export default self => {
  const { dispatch } = getEnv(self).store;
  const listRequested = dep('connection', 'actions', 'listRequested');
  const addColumnToContext = dep('connection', 'actions', 'addColumnToContext');

  return {
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
      // Get the last fetched page of that list.
      const page = self.connection.list(type, id).total.fetched.pages + 1;
      const nextPage = self.connection.list(type, id).page(page);
      // Ask for the page.
      if (!nextPage.ready && !nextPage.fetching)
        dispatch(listRequested({ list: { type, id, page } }));
      // Add it to the context if it's not already there.
      const item = { type, id, page, extract: 'horizontal' };
      if (!self.connection.selectedContext.hasItem({ item }))
        dispatch(addColumnToContext({ column: [{ type, id, page, extract: 'horizontal' }] }));
      // Wait until it's ready.
      yield when(
        () =>
          self.connection.list(type, id).page(page).ready ||
          self.connection.selectedContext.index !== index,
      );
    }),
  };
};

/* eslint-disable func-names */
import { when } from 'mobx';
import { flow, addMiddleware } from 'mobx-state-tree';
import { filterAlreadyRequested, syncActionEnds } from './utils';
import scrollMiddleware from './middleware/scroll';
import progressMiddleware from './middleware/progress';
import base from '../../shared/stores';

export default base.actions(self => ({
  requestFirstExtracted: flow(function*() {
    // Check if there are extracted in the context and fetch them if needed.
    const pagesToWait = [];
    const { connection } = self.root;

    connection.selectedContext.rawColumns.forEach(column => {
      if (column.hasExtracted('horizontal')) {
        const item = column.rawItems[0];
        if (
          !item.list.page(item.page).isReady &&
          !item.list.page(item.page).isFetching
        ) {
          connection.fetchListPage({
            type: item.type,
            id: item.id,
            page: item.page,
          });
          pagesToWait.push({ list: item.list, page: item.page });
        }
      }
    });

    yield Promise.all(
      pagesToWait.map(({ list, page }) => when(() => list.page(page).isReady)),
    );
  }),
  requestNextPageInSingle: flow(function*() {
    const { connection } = self.root;
    // Check if we are in the last two items.
    if (
      connection.selectedColumn.index >=
        connection.selectedContext.columns.length - 2 &&
      connection.selectedContext.options.bar === 'single'
    ) {
      // Get the fromList of the last item.
      const { index, columns } = connection.selectedContext;
      const { type, id, page: lastPage } = columns[
        columns.length - 1
      ].items[0].fromList;
      const page = lastPage + 1;
      // Get the last page added to that list.
      const nextPage = connection.list(type, id).page(page);
      // Fetch that page.
      if (!nextPage.isReady && !nextPage.isFetching)
        connection.fetchListPage({ type, id, page });
      // Add it to the context if it's not already there.
      const item = { type, id, page, extract: 'horizontal' };
      if (!connection.selectedContext.hasItem({ item }))
        connection.addColumnToContext({
          column: [{ type, id, page, extract: 'horizontal' }],
        });
      // Wait until it's ready.
      yield when(
        () =>
          connection.list(type, id).page(page).isReady ||
          connection.selectedContext.index !== index,
      );
    }
  }),
  requestNeededLists() {
    const { connection } = self.root;

    if (connection.selectedContext.options.bar === 'list') {
      const { rawColumns } = connection.selectedContext;
      const selectedColumnIndex = connection.selectedColumn.index;
      const previousIndex =
        selectedColumnIndex === 0 ? null : selectedColumnIndex - 1;
      const nextIndex =
        selectedColumnIndex === rawColumns.length - 1
          ? null
          : selectedColumnIndex + 1;
      const neededColumns = [rawColumns[selectedColumnIndex]];

      if (previousIndex !== null) neededColumns.push(rawColumns[previousIndex]);
      if (nextIndex !== null) neededColumns.push(rawColumns[nextIndex]);

      const items = neededColumns.map(column => ({
        type: column.rawItems[0].type,
        id: column.rawItems[0].id,
        page: column.rawItems[0].page,
      }));

      filterAlreadyRequested(items, connection).forEach(item => {
        if (item.page) connection.fetchListPage(item);
        else connection.fetchEntity(item);
      });
    }
  },
  afterCsr: () => {
    const { connection } = self.root;

    // Handles needed requests on route change.
    addMiddleware(
      connection,
      syncActionEnds('routeChangeSucceed', self.requestNeededLists),
    );
    // Handles next page requests on single view.
    addMiddleware(
      connection,
      syncActionEnds('routeChangeSucceed', self.requestNextPageInSingle),
    );
    // Handles top progress bar.
    addMiddleware(connection, progressMiddleware);
    // Handles scroll on route change.
    addMiddleware(connection, scrollMiddleware);

    self.requestFirstExtracted();
    self.requestNeededLists();
    self.scroll.initializeScrollListener();
  },
}));

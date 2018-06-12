import { when } from 'mobx';
import { types, getParent, flow } from 'mobx-state-tree';
import isMatch from 'lodash/isMatch';
import Localization from './lang';
import Menu from './menu';
import Cookies from './cookies';
import Comments from './comments';
import Scroll from './scroll';
import Share from './share';

export default types
  .model('Saturn')
  .props({
    lang: types.optional(Localization, {}),
    menu: types.optional(Menu, {}),
    cookies: types.optional(Cookies, {}),
    commentsMap: types.optional(types.map(types.map(Comments)), {}),
    scroll: types.optional(Scroll, {}),
    share: types.optional(Share, {}),
  })
  .views(self => ({
    get root() {
      return getParent(self);
    },
    get listsFromMenu() {
      return self.root.settings.theme.menu
        .filter(({ type }) => ['latest', 'category', 'tag', 'author'].includes(type))
        .map(list => ({
          id: parseInt(list[list.type], 10) || 'post',
          type: list.type,
          title: list.label,
        }));
    },
    getSlotsForItem({ type, id, page }) {
      return (self.root.settings.theme.slots || [])
        .filter(
          ({ rules }) => !!rules.item && rules.item.some(rule => isMatch({ type, id, page }, rule)),
        )
        .sort((a, b) => b.position - a.position);
    },
    getSlotsForColumn({ type, index }) {
      return (self.root.settings.theme.slots || [])
        .filter(
          ({ rules }) =>
            !!rules.column && rules.column.some(rule => isMatch({ type, index }, rule)),
        )
        .sort((a, b) => b.position - a.position);
    },
    comments(type, id) {
      return self.commentsMap.get(type).get(id);
    },
  }))
  .actions(self => ({
    getNextPage: flow(function* getNextPage() {
      const { connection } = self.root;

      const { type, id, page } = connection.selectedColumn.items[
        connection.selectedColumn.items.length - 1
      ];

      const initialColumnIndex = connection.selectedColumn.index;

      if (!connection.list(type, id).page(page + 1).isReady) {
        connection.fetchListPage({ type, id, page: page + 1 });

        // Waits for the new page to be ready and then paint it.
        yield when(() => connection.list(type, id).page(page + 1).isReady);
      }

      if (initialColumnIndex !== connection.selectedColumn.index) return;

      connection.addItemToColumn({ type, id, page: page + 1 });
    }),
    requestFirstExtracted: flow(function* requestFirstExtracted() {
      // Check if there are extracted in the context and fetch them if needed
      const pagesToWait = [];
      const { connection } = self.root;

      connection.selectedContext.rawColumns.map(column => {
        if (column.hasExtracted('horizontal')) {
          const item = column.rawItems[0];
          if (!item.list.page(item.page).isReady && !item.list.page(item.page).isFetching) {
            connection.fetchListPage({ type: item.type, id: item.id, page: item.page });
            pagesToWait.push({ list: item.list, page: item.page });
          }
        }
      });
      yield Promise.all(pagesToWait.map(({ list, page }) => when(() => list.page(page).isReady)));
    }),
    requestNextPageInSingle: flow(function* requestNextPageInSingle() {
      const { connection } = self.root;
      // Wait until we are in the last two items.
      yield when(
        () =>
          connection.selectedColumn.index >= connection.selectedContext.columns.length - 2 &&
          connection.selectedContext.options.bar === 'single',
      );
      // Get the fromList of the last item.
      const { index, columns } = connection.selectedContext;
      const { type, id, page: lastPage } = columns[columns.length - 1].items[0].fromList;
      const page = lastPage + 1;
      // Get the last page added to that list.
      const nextPage = connection.list(type, id).page(page);
      // Ask for the page.
      if (!nextPage.isReady && !nextPage.isFetching) connection.fetchListPage({ type, id, page });
      // Add it to the context if it's not already there.
      const item = { type, id, page, extract: 'horizontal' };
      if (!connection.selectedContext.hasItem({ item }))
        connection.addColumnToContext({ column: [{ type, id, page, extract: 'horizontal' }] });
      // Wait until it's ready.
      yield when(
        () =>
          connection.list(type, id).page(page).isReady ||
          connection.selectedContext.index !== index,
      );
    }),
    loadClassicVersion() {
      window.document.cookie = 'wppwaClassicVersion=true;path=/';
      window.location.reload(true);
    },
  }));

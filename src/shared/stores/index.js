/* eslint-disable func-names */
import { when } from 'mobx';
import { types, getParent, flow } from 'mobx-state-tree';
import isMatch from 'lodash/isMatch';
import Share from '@frontity/share';
import Lang from './lang';
import Menu from './menu';
import Comments from './comments';
import Scroll from './scroll';
import ShareModal from './shareModal';

export default types
  .model('Saturn')
  .props({
    lang: types.optional(Lang, {}),
    menu: types.optional(Menu, {}),
    commentsMap: types.optional(types.map(types.map(Comments)), {}),
    scroll: types.optional(Scroll, {}),
    share: types.optional(Share, {}),
    shareModal: types.optional(ShareModal, {}),
  })
  .views(self => ({
    get root() {
      return getParent(self);
    },
    get listsFromMenu() {
      return (self.root.settings.theme.menu || [])
        .filter(({ type }) =>
          ['latest', 'category', 'tag', 'author'].includes(type),
        )
        .map(list => ({
          id: parseInt(list[list.type], 10) || 'post',
          type: list.type,
          title: list.label,
        }));
    },
    getSlotsForItem({ type, id, page }) {
      return (self.root.settings.theme.slots || [])
        .filter(
          ({ rules }) =>
            !!rules.item &&
            rules.item.some(rule => isMatch({ type, id, page }, rule)),
        )
        .sort((a, b) => b.position - a.position);
    },
    getSlotsForColumn({ type, index }) {
      return (self.root.settings.theme.slots || [])
        .filter(
          ({ rules }) =>
            !!rules.column &&
            rules.column.some(rule => isMatch({ type, index }, rule)),
        )
        .sort((a, b) => b.position - a.position);
    },
    comments(type, id) {
      if (!self.commentsMap.get(type) || !self.commentsMap.get(type).get(id)) {
        self.addComments(type, id);
      }

      return self.commentsMap.get(type).get(id);
    },
  }))
  .actions(self => ({
    getNextPage: flow(function*() {
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

      connection.addItemToColumn({ item: { type, id, page: page + 1 } });
    }),
    loadClassicVersion() {
      window.document.cookie = 'wppwaClassicVersion=true;path=/';
      window.location.reload(true);
    },
    addComments(type, id) {
      if (!self.commentsMap.get(type)) self.commentsMap.set(type, {});
      if (!self.commentsMap.get(type).get(id))
        self.commentsMap.get(type).set(id, {});
    },
  }));

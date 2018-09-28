/* eslint-disable func-names */
import React from 'react';
import { when } from 'mobx';
import { types, getParent, flow } from 'mobx-state-tree';
import isMatch from 'lodash/isMatch';
import Share from '@frontity/share';
import H2R from '@frontity/h2r/model';
import * as procs from '@frontity/h2r/processors';
import Lang from './lang';
import Menu from './menu';
import Comments from './comments';
import Scroll from './scroll';
import ShareModal from './shareModal';
import highProcs from '../../shared/processors/high';
import mediumProcs from '../../shared/processors/medium';
import lowProcs from '../../shared/processors/low';
import IconAudio from '../../shared/components/Icons/Audio';
import IconTwitter from '../../shared/components/Icons/Twitter';
import IconInstagram from '../../shared/components/Icons/Instagram';
import IconVideo from '../../shared/components/Icons/Video';
import Spinner from '../../shared/components/Spinner';

export default types
  .model('Saturn')
  .props({
    lang: types.optional(Lang, {}),
    menu: types.optional(Menu, {}),
    commentsMap: types.map(types.map(Comments)),
    scroll: types.optional(Scroll, {}),
    share: types.optional(Share, {}),
    shareModal: types.optional(ShareModal, {}),
    h2r: types.optional(H2R, {}),
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
    afterCreate() {
      highProcs.forEach(proc => self.h2r.addProcessor(proc, 'high'));

      [
        procs.removeHidden,
        procs.removeAmpIds,
        procs.removeAmpListTypes,
        procs.removeAmpColWidth,
      ]
        .concat(mediumProcs)
        .forEach(proc => self.h2r.addProcessor(proc, 'medium'));

      [
        procs.removeDoctypeTag,
        procs.removeHtmlTag,
        procs.removeHeadTag,
        procs.removeBodyTag,
        procs.removeTagStyle,
        procs.removeInlineStyle,
        procs.facebook,
        procs.soundcloud,
      ].forEach(proc => self.h2r.addProcessor(proc, 'low'));

      self.h2r.addProcessor(procs.audio, 'low', {
        placeholder: <IconAudio size={40} />,
      });
      self.h2r.addProcessor(procs.video, 'low', {
        placeholder: <IconVideo size={40} />,
      });
      self.h2r.addProcessor(procs.youtube, 'low', {
        placeholder: <IconVideo size={40} />,
      });
      self.h2r.addProcessor(procs.twitter, 'low', {
        placeholder: <IconTwitter size={40} />,
      });
      self.h2r.addProcessor(procs.instagram, 'low', {
        placeholder: <IconInstagram size={40} />,
      });

      self.h2r.addProcessor(procs.iframe, 'low', { placeholder: <Spinner /> });

      lowProcs.forEach(proc => self.h2r.addProcessor(proc, 'low'));
    },
  }));

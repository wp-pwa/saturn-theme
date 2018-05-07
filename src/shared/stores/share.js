import { types, getEnv } from 'mobx-state-tree';
import * as actionTypes from '../../pwa/actionTypes';

export default types
  .model('Share')
  .props({
    isOpen: types.optional(types.boolean, false),
    linkCopied: types.optional(types.boolean, false),
    shareItem: types.optional(
      types.model({
        type: types.maybe(types.string),
        id: types.maybe(types.number),
      }),
      {},
    ),
    entities: types.optional(
      types.map(
        types.map(
          types.model({
            ready: types.optional(types.boolean, false),
            counts: types.optional(types.map(types.number), {}),
          }),
        ),
      ),
      {},
    ),
  })
  .actions(self => {
    const { store, isClient } = getEnv(self);

    return {
      [actionTypes.SHARE_MODAL_OPENING_REQUESTED]({ wpType, id }) {
        if (!self.isOpen) self.isOpen = true;
        self.shareItem.type = wpType;
        self.shareItem.id = id;
      },
      [actionTypes.SHARE_MODAL_CLOSING_REQUESTED]() {
        if (self.isOpen) self.isOpen = false;
      },
      [actionTypes.LINK_COPIED]({ value }) {
        if (self.linkCopied !== value) self.linkCopied = value;
      },
      [actionTypes.ALL_SHARE_COUNT_REQUESTED]({ wpType, id }) {
        if (!self.entities.get(wpType)) self.entities.set(wpType, {});
        if (!self.entities.get(wpType).get(id)) self.entities.get(wpType).set(id, {});
      },
      [actionTypes.SHARE_COUNT_REQUESTED]({ wpType, id, network }) {
        if (
          !self.entities
            .get(wpType)
            .get(id)
            .counts.get(network)
        )
          self.entities
            .get(wpType)
            .get(id)
            .counts.set(network, 0);
      },
      [actionTypes.SHARE_COUNT_SUCCEED]({ wpType, id, network, value }) {
        self.entities
          .get(wpType)
          .get(id)
          .counts.set(network, value);
      },
      [actionTypes.ALL_SHARE_COUNT_RESOLVED]({ wpType, id }) {
        self.entities.get(wpType).get(id).ready = true;
      },
      afterCreate: () => {
        if (isClient) {
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

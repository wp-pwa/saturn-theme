import { types, getParent, getEnv, flow } from 'mobx-state-tree';

const Item = types.model({
  type: types.maybe(types.string),
  id: types.maybe(types.number),
});

export default types
  .model('ShareModal')
  .props({
    isOpen: false,
    isLinkCopied: false,
    item: types.optional(Item, {}),
  })
  .actions(self => ({
    open({ type, id }) {
      self.item = { type, id };
      self.isOpen = true;
      getParent(self).share.all.requestCount(self.item);
    },
    close() {
      self.isOpen = false;
    },
    setLinkCopied: flow(function* copyLink() {
      const { delay } = getEnv(self).theme;

      self.isLinkCopied = true;
      yield delay(1000);
      self.isLinkCopied = false;
    }),
  }));

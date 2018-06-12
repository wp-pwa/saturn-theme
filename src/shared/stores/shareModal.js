import { types, getParent, flow } from 'mobx-state-tree';

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
      self.isLinkCopied = true;
      yield new Promise(resolve => setTimeout(resolve, 1000));
      self.isLinkCopied = false;
    }),
  }));

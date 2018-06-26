import { types } from 'mobx-state-tree';

export default types
  .model('Scroll')
  .props({
    isBarHidden: types.optional(types.boolean, false),
    latestDirection: types.maybe(types.string),
  })
  .actions(self => ({
    hideBar() {
      if (!self.isBarHidden) self.isBarHidden = true;
    },
    showBar() {
      if (self.isBarHidden) self.isBarHidden = false;
    },
    setLatestDirection(value) {
      self.latestDirection = value;
    },
  }));

import { types } from 'mobx-state-tree';

export default types
  .model('Scroll')
  .props({
    isBarHidden: types.optional(types.boolean, false),
  })
  .actions(self => ({
    hideBar() {
      if (!self.isBarHidden) self.isBarHidden = true;
    },
    showBar() {
      if (self.isBarHidden) self.isBarHidden = false;
    },
  }));

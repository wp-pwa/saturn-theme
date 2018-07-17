import { types } from 'mobx-state-tree';

export default types
  .model('Comments')
  .props({
    isOpen: false,
    wasOpen: false,
  })
  .actions(self => ({
    open() {
      if (!self.isOpen) self.isOpen = true;
      if (!self.wasOpen) self.wasOpen = true;
    },
    close() {
      if (self.isOpen) self.isOpen = false;
    },
  }));

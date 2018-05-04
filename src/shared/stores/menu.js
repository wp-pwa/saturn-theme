import { types } from 'mobx-state-tree';

const Menu = types
  .model('Menu')
  .props({
    isOpen: types.optional(types.boolean, false),
  })
  .actions(self => ({
    hasOpen() {
      if (!self.isOpen) self.isOpen = true;
    },
    hasClosed() {
      if (self.isOpen) self.isOpen = false;
    },
    closeMenuOnRouteChange() {
      
    },
  }));

export default Menu;

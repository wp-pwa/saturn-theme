import { types } from 'mobx-state-tree';

export default types
  .model('Cookies')
  .props({
    accepted: types.optional(types.boolean, true),
  })
  .actions(self => ({
    haveBeenRequested() {
      if (self.accepted) self.accepted = false;
    },
    haveBeenAccepted() {
      if (!self.accepted) self.accepted = true;
    },
  }));

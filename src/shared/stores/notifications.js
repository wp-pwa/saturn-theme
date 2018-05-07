import { types } from 'mobx-state-tree';
import * as actionTypes from '../../pwa/actionTypes';

export default types
  .model('Notifications')
  .props({
    areSupported: types.optional(types.boolean, false),
    areEnabled: types.optional(types.boolean, true),
    areRegistered: types.optional(types.boolean, false),
  })
  .actions(self => ({
    [actionTypes.NOTIFICATIONS_ARE_SUPPORTED]() {
      if (!self.areSupported) self.areSupported = true;
    },
    [actionTypes.NOTIFICATIONS_HAVE_BEEN_REQUESTED]() {
      if (self.areEnabled) self.areEnabled = false;
    },
    [actionTypes.NOTIFICATIONS_HAVE_BEEN_ENABLED]() {
      if (!self.areEnabled) self.areEnabled = true;
      if (!self.areRegistered) self.areRegistered = true;
    },
    [actionTypes.NOTIFICATIONS_HAVE_BEEN_DISABLED]() {
      if (self.areEnabled) self.areEnabled = false;
    },
  }));

import { combineReducers } from 'redux';
import * as types from '../types';

const enabled = (state = true, action) => {
  switch (action.type) {
    case types.NOTIFICATIONS_HAVE_BEEN_REQUESTED:
    case types.NOTIFICATIONS_HAVE_BEEN_DISABLED:
      return false;
    case types.NOTIFICATIONS_HAVE_BEEN_ENABLED:
      return true;
    default:
      return state;
  }
};

const notifications = combineReducers({
  enabled,
});

export default notifications;

import { combineReducers } from 'redux';
import * as types from '../types';

const isScrolling = (state = false, action) => {
  switch (action.type) {
    case types.NAV_SCROLL_STARTED:
      return true;
    case types.NAV_SCROLL_FINISHED:
      return false;
    default:
      return state;
  }
};

const interval = (state = null, action) => {
  switch (action.type) {
    case types.NAV_SCROLL_STARTED:
      return action.interval;
    case types.NAV_SCROLL_FINISHED:
      return null;
    default:
      return state;
  }
};

const nav = combineReducers({
  isScrolling,
  interval
});

export default nav;

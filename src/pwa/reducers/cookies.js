import { combineReducers } from 'redux';
import * as types from '../types';

const accepted = (state = true, action) => {
  switch (action.type) {
    case types.COOKIES_HAVE_BEEN_REQUESTED:
      return false;
    case types.COOKIES_HAVE_BEEN_ACCEPTED:
      return true;
    default:
      return state;
  }
};

const cookies = combineReducers({
  accepted,
});

export default cookies;

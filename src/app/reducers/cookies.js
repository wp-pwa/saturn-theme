/* global localStorage */
import { combineReducers } from 'redux';
import { COOKIES_HAVE_BEEN_ACCEPTED } from '../types';

const accepted = (state = Boolean(localStorage.cookiesAccepted), action) => {
  switch (action.type) {
    case COOKIES_HAVE_BEEN_ACCEPTED:
      return true;
    default:
      return state;
  }
};

const cookies = combineReducers({
  accepted,
});

export default cookies;

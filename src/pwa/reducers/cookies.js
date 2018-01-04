import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes';

const accepted = (state = true, action) => {
  switch (action.type) {
    case actionTypes.COOKIES_HAVE_BEEN_REQUESTED:
      return false;
    case actionTypes.COOKIES_HAVE_BEEN_ACCEPTED:
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  accepted
});

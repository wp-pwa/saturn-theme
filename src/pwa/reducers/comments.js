import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes';

const isOpen = (state = false, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_COMMENTS:
      return !state;
    default:
      return state;
  }
};

const comments = combineReducers({
  isOpen,
});

export default comments;

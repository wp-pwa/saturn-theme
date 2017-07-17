import { combineReducers } from 'redux';
import * as types from '../types';

const isOpen = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE_COMMENTS:
      return !state;
    default:
      return state;
  }
};

const comments = combineReducers({
  isOpen,
});

export default comments;

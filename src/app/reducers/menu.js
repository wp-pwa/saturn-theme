import { combineReducers } from 'redux';
import { MENU_HAS_OPEN, MENU_HAS_CLOSED } from '../types';

const isOpen = (state = false, action) => {
  switch (action.type) {
    case MENU_HAS_OPEN:
      return true;
    case MENU_HAS_CLOSED:
      return false;
    default:
      return state;
  }
};

const comments = combineReducers({
  isOpen,
});

export default comments;

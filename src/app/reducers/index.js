import { combineReducers } from 'redux';
import * as types from '../types';

const isOpen = (state = false, action) => {
  switch (action.type) {
    case types.SHARE_MODAL_OPENED:
      return true;
    case types.SHARE_MODAL_CLOSED:
      return false;
    default:
      return state;
  }
};

const id = (state = NaN, action) => {
  switch (action.type) {
    case types.SHARE_MODAL_OPENED:
      return action.id;
    default:
      return state;
  }
};

const wpType = (state = null, action) => {
  switch (action.type) {
    case types.SHARE_MODAL_OPENED:
      return action.wpType;
    default:
      return state;
  }
};

const shareModal = combineReducers({
  isOpen,
  id,
  wpType,
});

export default () =>
  combineReducers({
    shareModal,
  });

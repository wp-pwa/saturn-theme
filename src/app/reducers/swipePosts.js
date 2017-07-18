import { combineReducers } from 'redux';
import { CREATE_SWIPE, CHANGE_SWIPE_INDEX } from '../types';

const swipeIndex = (state = 0, action) => {
  switch (action.type) {
    case CREATE_SWIPE:
      return action.swipeIndex;
    case CHANGE_SWIPE_INDEX:
      return action.swipeIndex;
    default:
      return state;
  }
};

const swipeLength = (state = 0, action) => {
  switch (action.type) {
    case CREATE_SWIPE:
      return action.swipeLength;
    default:
      return 0;
  }
};

const swipePosts = combineReducers({ swipeLength, swipeIndex });

export default swipePosts;

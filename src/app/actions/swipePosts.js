import { CREATE_SWIPE, CHANGE_SWIPE_INDEX } from '../types';

export const createSwipe = (swipeLength, swipeIndex) => ({
  type: CREATE_SWIPE,
  swipeLength,
  swipeIndex,
});

export const changeSwipeIndex = swipeIndex => ({
  type: CHANGE_SWIPE_INDEX,
  swipeIndex,
});

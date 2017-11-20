import * as actionTypes from '../actionTypes';

export const activePostSlideChangeRequested = () => ({
  type: actionTypes.ACTIVE_POST_SLIDE_CHANGE_REQUESTED
});

export const activePostSlideChangeStarted = ({ from, direction }) => ({
  type: actionTypes.ACTIVE_POST_SLIDE_CHANGE_STARTED,
  from,
  direction,
});

export const activeSlideHasChanged = ({ id, wpType }) => ({
  type: types.ACTIVE_POST_SLIDE_HAS_CHANGED,
  id,
  wpType,
});

export const activePostSlideChangeFinished = () => ({
  type: actionTypes.ACTIVE_POST_SLIDE_CHANGE_FINISHED
});

export const postHasScrolled = ({ direction }) => ({
  type: actionTypes.POST_HAS_SCROLLED,
  direction
});

export const barsHaveHidden = () => ({
  type: actionTypes.BARS_HAVE_HIDDEN
});

export const barsHaveShown = () => ({
  type: actionTypes.BARS_HAVE_SHOWN
});

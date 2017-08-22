import * as types from '../types';

export const activePostSlideChangeRequested = () => ({
  type: types.ACTIVE_POST_SLIDE_CHANGE_REQUESTED
});

export const activePostSlideChangeStarted = ({ from, direction }) => ({
  type: types.ACTIVE_POST_SLIDE_CHANGE_STARTED,
  from,
  direction
});

export const activePostSlideChangeFinished = () => ({
  type: types.ACTIVE_POST_SLIDE_CHANGE_FINISHED
});

export const postHasScrolled = ({ direction }) => ({
  type: types.POST_HAS_SCROLLED,
  direction
});

export const barsHaveHidden = () => ({
  type: types.BARS_HAVE_HIDDEN
});

export const barsHaveShown = () => ({
  type: types.BARS_HAVE_SHOWN
});

import * as types from '../types';

export const activePostSlideChangeRequested = () => ({
  type: types.ACTIVE_POST_SLIDE_CHANGE_REQUESTED
});

export const activePostSlideChangeStarted = () => ({
  type: types.ACTIVE_POST_SLIDE_CHANGE_STARTED
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

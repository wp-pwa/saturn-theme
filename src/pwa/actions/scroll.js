import * as actionTypes from '../actionTypes';

export const windowHasScrolled = ({ direction }) => ({
  type: actionTypes.WINDOW_HAS_SCROLLED,
  direction
});

export const barsHaveHidden = () => ({
  type: actionTypes.BARS_HAVE_HIDDEN
});

export const barsHaveShown = () => ({
  type: actionTypes.BARS_HAVE_SHOWN
});

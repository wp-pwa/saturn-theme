import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getHiddenBars = state => state.theme.postSlider.hiddenBars;

export const getSliderLength = state =>
  dep('connection', 'selectorCreators', 'getListResults')('currentList')(state).length;

export const getActiveSlide = createSelector(
  dep('router', 'selectors', 'getId'),
  state => dep('connection', 'selectorCreators', 'getListResults')('currentList')(state),
  (id, list) => list.indexOf(id)
);

export const getCurrentPostId = createSelector(
  state => dep('connection', 'selectors', 'getCurrentSingle')(state),
  post => post.id
);

export const isLastPost = createSelector(
  state => dep('connection', 'selectorCreators', 'getNumberOfTotalItems')('currentList')(state),
  state => getActiveSlide(state),
  (totalLength, activeSlide) => totalLength - 1 === activeSlide
);

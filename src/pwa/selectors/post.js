import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getHiddenBars = state => state.theme.postSlider.hiddenBars;

export const getSliderLength = state =>
  dep('connection', 'selectorCreators', 'getListResults')('currentList')(state).length;

export const getSliderDirection = state => state.theme.postSlider.sliderDirection;

export const getActiveSlide = createSelector(
  dep('router', 'selectors', 'getId'),
  state => dep('connection', 'selectorCreators', 'getListResults')('currentList')(state),
  (id, list) => list.indexOf(id)
);

import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getHiddenBars = state => state.theme.postSlider.hiddenBars;

export const getFirstId = state => parseInt(state.theme.ssr.firstId, 10);

export const getSliderList = createSelector(
  getFirstId,
  state => dep('connection', 'selectorCreators', 'getListResults')('currentList')(state),
  (id, list) => {
    if (!id) return list;
    return [id].concat(list.filter(item => item !== id));
  },
);

export const getActiveSlide = createSelector(
  dep('router', 'selectors', 'getId'),
  getSliderList,
  (id, list) => list.indexOf(id),
);

export const getSliderLength = createSelector(getSliderList, list => list.length);

export const getCurrentPostId = createSelector(
  state => dep('connection', 'selectors', 'getCurrentSingle')(state),
  post => post.id,
);

export const isLastPost = createSelector(
  state => dep('connection', 'selectorCreators', 'getNumberOfTotalItems')('currentList')(state),
  getActiveSlide,
  (totalLength, activeSlide) => totalLength - 1 === activeSlide,
);

export const getNextPostsList = createSelector(getSliderList, getActiveSlide, (list, current) =>
  list.slice(current),
);

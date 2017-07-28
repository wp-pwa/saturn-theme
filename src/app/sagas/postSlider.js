import { take, put, fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { SAVE_TEMP_POST_SLIDER_STATE, ACTIVE_POST_SLIDE_HAS_CHANGED, POST_HAS_SCROLLED } from '../types';
import { actions, types } from '../deps';
import { postSlider } from '../actions';

function* handlePostsPrefetching() {
  //eslint-disable-next-line
  while (true) {
    const action = yield take(ACTIVE_POST_SLIDE_HAS_CHANGED);

    if (action.activeSlide >= action.sliderLength - 2) {
      yield put(actions.anotherPostsPageRequested());
      yield take(
        ({ type, name }) =>
          (type === types.ANOTHER_POSTS_PAGE_SUCCEED || type === types.ANOTHER_POSTS_PAGE_FAILED) &&
          name === 'currentList'
      );
    }
  }
}

function* handleHiddenBarsOnScroll(action) {
  const hiddenBars = yield select(state => state.theme.postSlider.hiddenBars);
  const { direction } = action;

  if (direction === 'up' && !hiddenBars) {
    yield put(postSlider.hideBars());
  } else if (direction === 'down' && hiddenBars) {
    yield put(postSlider.showBars());
  }
}

function* handleHiddenBarsOnScrollWatcher() {
  yield takeEvery(POST_HAS_SCROLLED, handleHiddenBarsOnScroll);
}

function* handleHiddenBarsOnSlideChange() {
  const hiddenBars = yield select(state => state.theme.postSlider.hiddenBars);

  if (hiddenBars) yield put(postSlider.showBars());
}

function* handleHiddenBarsOnSlideChangeWatcher() {
  yield takeEvery(SAVE_TEMP_POST_SLIDER_STATE, handleHiddenBarsOnSlideChange);
}

export default function* postSliderSagas() {
  yield [
    fork(handlePostsPrefetching),
    fork(handleHiddenBarsOnScrollWatcher),
    fork(handleHiddenBarsOnSlideChangeWatcher),
  ];
}

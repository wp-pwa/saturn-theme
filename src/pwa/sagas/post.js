import { take, put, fork, select, all, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import * as types from '../types';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* handleSlideChange() {
  yield put(actions.postSlider.activePostSlideChangeStarted());

  yield put(actions.postSlider.activePostSlideChangeFinished());
}

function* handleSlideChangeWatcher() {
  yield takeEvery(types.ACTIVE_POST_SLIDE_CHANGE_REQUESTED, handleSlideChange);
}

function* handlePostsPrefetching() {
  //eslint-disable-next-line
  while (true) {
    yield take(types.ACTIVE_POST_SLIDE_CHANGE_FINISHED);

    const ANOTHER_POSTS_PAGE_SUCCEED = yield dep(
      'connection',
      'types',
      'ANOTHER_POSTS_PAGE_SUCCEED'
    );
    const ANOTHER_POSTS_PAGE_FAILED = yield dep('connection', 'types', 'ANOTHER_POSTS_PAGE_FAILED');
    const sliderLength = yield select(state => selectors.post.getSliderLength(state));
    const activeSlide = yield select(state => selectors.post.getActiveSlide(state));

    if (activeSlide >= sliderLength - 2) {
      yield put(dep('connection', 'actions', 'anotherPostsPageRequested')());
      yield take(
        ({ type, name }) =>
          (type === ANOTHER_POSTS_PAGE_SUCCEED || type === ANOTHER_POSTS_PAGE_FAILED) &&
          name === 'currentList'
      );
    }
  }
}

function* handleHiddenBarsOnScroll(action) {
  const hiddenBars = yield select(state => selectors.post.getHiddenBars(state));
  const { direction } = action;

  if (direction === 'up' && !hiddenBars) {
    yield put(actions.postSlider.barsHaveHidden());
  } else if (direction === 'down' && hiddenBars) {
    yield put(actions.postSlider.barsHaveShown());
  }
}

function* handleHiddenBarsOnScrollWatcher() {
  yield takeEvery(types.POST_HAS_SCROLLED, handleHiddenBarsOnScroll);
}

function* handleHiddenBarsOnSlideChange() {
  const hiddenBars = yield select(state => state.theme.postSlider.hiddenBars);

  if (hiddenBars) yield put(actions.postSlider.barsHaveShown());
}

function* handleHiddenBarsOnSlideChangeWatcher() {
  yield takeEvery(types.ACTIVE_POST_SLIDE_CHANGE_STARTED, handleHiddenBarsOnSlideChange);
}

export default function* postSagas() {
  yield all([
    fork(handleSlideChangeWatcher),
    fork(handlePostsPrefetching),
    fork(handleHiddenBarsOnScrollWatcher),
    fork(handleHiddenBarsOnSlideChangeWatcher)
  ]);
}

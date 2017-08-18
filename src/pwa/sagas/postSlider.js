import { take, put, fork, select, all, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import * as types from '../types';
import { postSlider } from '../actions';

function* handleSlideChange(action) {
  const { activeSlide, sliderAnimation, sliderLength } = action;

  yield put(
    postSlider.activePostSlideChangeStarted({
      activeSlide
    })
  );

  yield put(
    postSlider.activePostSlideChangeFinished({
      activeSlide,
      sliderAnimation,
      sliderLength
    })
  );
}

function* handleSlideChangeWatcher() {
  yield takeEvery(types.ACTIVE_POST_SLIDE_CHANGE_REQUESTED, handleSlideChange);
}

function* handlePostsPrefetching() {
  //eslint-disable-next-line
  while (true) {
    const action = yield take(types.ACTIVE_POST_SLIDE_CHANGE_FINISHED);
    const ANOTHER_POSTS_PAGE_SUCCEED = dep('connection', 'types', 'ANOTHER_POSTS_PAGE_SUCCEED');
    const ANOTHER_POSTS_PAGE_FAILED = dep('connection', 'types', 'ANOTHER_POSTS_PAGE_FAILED');

    if (action.activeSlide >= action.sliderLength - 2) {
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
  const hiddenBars = yield select(state => state.theme.postSlider.hiddenBars);
  const { direction } = action;

  if (direction === 'up' && !hiddenBars) {
    yield put(postSlider.barsHaveHidden());
  } else if (direction === 'down' && hiddenBars) {
    yield put(postSlider.barsHaveShown());
  }
}

function* handleHiddenBarsOnScrollWatcher() {
  yield takeEvery(types.POST_HAS_SCROLLED, handleHiddenBarsOnScroll);
}

function* handleHiddenBarsOnSlideChange() {
  const hiddenBars = yield select(state => state.theme.postSlider.hiddenBars);

  if (hiddenBars) yield put(postSlider.barsHaveShown());
}

function* handleHiddenBarsOnSlideChangeWatcher() {
  yield takeEvery(types.ACTIVE_POST_SLIDE_CHANGE_STARTED, handleHiddenBarsOnSlideChange);
}

function* changeActiveSlideOnRouteChange() {
  const postList = yield select(state =>
    dep('connection', 'selectorCreators', 'getListResults')('currentList')(state)
  );
  console.log('postList:', postList);

  const posts = yield select(state => dep('connection', 'selectors', 'getPostsEntities')(state));
  console.log('posts', posts);
}

function* changeActiveSlideOnRouteChangeWatcher() {
  const ROUTE_CHANGE_SUCCEED = dep('router', 'types', 'ROUTE_CHANGE_SUCCEED');

  yield takeEvery(ROUTE_CHANGE_SUCCEED, changeActiveSlideOnRouteChange);
}

export default function* postSliderSagas() {
  yield all([
    fork(handleSlideChangeWatcher),
    fork(handlePostsPrefetching),
    fork(handleHiddenBarsOnScrollWatcher),
    fork(handleHiddenBarsOnSlideChangeWatcher),
    fork(changeActiveSlideOnRouteChangeWatcher)
  ]);
}

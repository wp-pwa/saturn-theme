import { take, put, fork, select, all, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import { parse } from 'url';
import Router from '@worona/next/router';
import * as types from '../types';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* changeRouteOnSlideChange({ from, direction }) {
  if (from === 'slider') yield take(types.ACTIVE_POST_SLIDE_CHANGE_FINISHED);

  const index = yield select(state => selectors.post.getActiveSlide(state));
  const list = yield select(state => selectors.post.getSliderList(state));

  let id;

  if ((index < list.length - 1 && direction === 'right') || (index > 0 && direction === 'left')) {
    if (direction === 'right') id = list[index + 1];
    else id = list[index - 1];

    const siteId = yield select(state => dep('settings', 'selectors', 'getSiteId')(state));
    const entity = yield select(
      state => dep('connection', 'selectors', 'getPostsEntities')(state)[id],
    );

    if (entity && entity.link) {
      const as = parse(entity.link).path;
      const url = `/?siteId=${siteId}&p=${id}`;

      Router.push(url, as);
    }
  }
}

function* handleRouteChange(action) {
  const { id, wpType } = action;
  const siteId = yield select(dep('settings', 'selectors', 'getSiteId'));
  const selectorName = `get${wpType
    .slice(0, 1)
    .toUpperCase()
    .concat(wpType.slice(1))}ById`;

  if (wpType === 'latest') {
    Router.push(`/?siteId=${siteId}`, '/');
  } else {
    const entity = yield select(dep('connection', 'selectorCreators', selectorName)(id));

    if (entity && entity.link) {
      const taxonomies = {
        post: 'p',
        category: 'cat',
        tag: 'tag',
        author: 'author',
      };

      const as = parse(entity.link).path;
      const url = `/?siteId=${siteId}&${taxonomies[wpType]}=${id}`;

      Router.push(url, as);
    }
  }
}

function* routeChangeWatcher() {
  yield takeEvery(types.ACTIVE_POST_SLIDE_HAS_CHANGED, handleRouteChange);
}

function* changeRouteOnSlideChangeWatcher() {
  yield takeEvery(types.ACTIVE_POST_SLIDE_CHANGE_STARTED, changeRouteOnSlideChange);
}

function* handlePostsPrefetching() {
  //eslint-disable-next-line
  while (true) {
    yield take(types.ACTIVE_POST_SLIDE_CHANGE_FINISHED);

    const ANOTHER_POSTS_PAGE_SUCCEED = yield dep(
      'connection',
      'types',
      'ANOTHER_POSTS_PAGE_SUCCEED',
    );
    const ANOTHER_POSTS_PAGE_FAILED = yield dep('connection', 'types', 'ANOTHER_POSTS_PAGE_FAILED');
    const sliderLength = yield select(state => selectors.post.getSliderLength(state));
    const activeSlide = yield select(state => selectors.post.getActiveSlide(state));

    if (activeSlide >= sliderLength - 2) {
      yield put(dep('connection', 'actions', 'anotherPostsPageRequested')());
      yield take(
        ({ type, name }) =>
          (type === ANOTHER_POSTS_PAGE_SUCCEED || type === ANOTHER_POSTS_PAGE_FAILED) &&
          name === 'currentList',
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
  yield all([
    takeEvery(types.ACTIVE_POST_SLIDE_CHANGE_STARTED, handleHiddenBarsOnSlideChange),
    takeEvery(dep('router', 'types', 'ROUTE_CHANGE_SUCCEED'), handleHiddenBarsOnSlideChange),
  ]);
}

export default function* postSagas() {
  yield all([
    fork(changeRouteOnSlideChangeWatcher),
    fork(handlePostsPrefetching),
    fork(handleHiddenBarsOnScrollWatcher),
    fork(handleHiddenBarsOnSlideChangeWatcher),
    fork(routeChangeWatcher),
  ]);
}

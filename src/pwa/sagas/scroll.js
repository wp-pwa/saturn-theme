import { call, put, select, all, takeEvery } from 'redux-saga/effects';
import { throttle } from 'lodash';
import { dep } from 'worona-deps';
import { eventChannel } from 'redux-saga';
import fastdom from 'fastdom';
import fdPromised from 'fastdom/extensions/fastdom-promised';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import { getScrollingElement } from '../../shared/helpers';

const fastdomPromised = fastdom.extend(fdPromised);

function* handleBarsOnScroll(action) {
  const { hiddenBars } = yield select(state => state.theme.scroll);
  const { direction } = action;

  if (direction === 'up' && !hiddenBars) {
    yield put(actions.scroll.barsHaveHidden());
  } else if (direction === 'down' && hiddenBars) {
    yield put(actions.scroll.barsHaveShown());
  }
}

const scroll = {
  latestDirection: null,
  latestScroll: 0,
};

const windowScroll = scrollingElement =>
  eventChannel(emitter => {
    const handleScroll = throttle(async () => {
      const getBoundingClientRectPromise = fastdomPromised.measure(() =>
        scrollingElement.getBoundingClientRect(),
      );
      const innerHeightPromise = fastdomPromised.measure(() => window.innerHeight);
      const [{ top, bottom }, height] = await Promise.all([
        getBoundingClientRectPromise,
        innerHeightPromise,
      ]);

      emitter({ top, bottom: bottom - height });
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

function* handleWindowScroll({ top, bottom }) {
  const { hiddenBars } = yield select(state => state.theme.scroll);
  const { latestDirection, latestScroll } = scroll;
  const isScrollingUp = latestScroll >= top;
  scroll.latestScroll = top;

  // Shows top/bottom bars if the scroll is too close to the top/bottom.
  if (top > -60 || bottom < 700) {
    if (hiddenBars) yield put(actions.scroll.barsHaveShown());
  } else if (isScrollingUp) {
    // Shows/hiddes bars depending on scroll direction.
    if (latestDirection !== 'up') {
      yield put(actions.scroll.windowHasScrolled({ direction: 'up' }));
      scroll.latestDirection = 'up';
    }
  } else if (latestDirection !== 'down') {
    yield put(actions.scroll.windowHasScrolled({ direction: 'down' }));
    scroll.latestDirection = 'down';
  }
}

const handleRouteChange = () => {
  scroll.latestDirection = null;
  scroll.latestScroll = 0;
};

export default function* scrollSagas() {
  const windowScrollEvent = windowScroll(yield call(getScrollingElement));

  yield all([
    takeEvery(windowScrollEvent, handleWindowScroll),
    takeEvery(actionTypes.WINDOW_HAS_SCROLLED, handleBarsOnScroll),
    takeEvery(dep('connection', 'actionTypes', 'ROUTE_CHANGE_SUCCEED'), handleRouteChange),
  ]);
}

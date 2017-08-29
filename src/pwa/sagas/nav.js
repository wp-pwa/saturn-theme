/* global document, screen */
import { takeEvery, fork, all, put, select, join } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* navScroll() {
  // Checks if Nav is scrolling and clears current interval.
  const isScrolling = yield select(state => selectors.nav.isScrolling(state));

  if (isScrolling) {
    const interval = yield select(state => selectors.nav.getInterval(state));
    clearInterval(interval);
    yield put(actions.nav.navScrollFinished());
  }

  // Checks if it is not a Post view so Nav will be rendered.
  const isNotPost = yield select(
    state => !parseInt(dep('router', 'selectors', 'getQuery')(state).p, 10)
  );

  if (isNotPost) {
    // Gets Nav's node and the node of the NavItem that's active.
    const nav = document.querySelector('.nav');
    const active = nav.querySelector('.active');

    // Calculates needed and avialable scroll.
    const max = nav.scrollWidth - screen.width;
    const current = nav.scrollLeft;
    const needed = active.getBoundingClientRect().left;
    const available = Math.round(max - current < needed ? max - current : needed);
    const isNeeded = Math.abs(needed);
    const isAvailable = Math.abs(available);

    // Checks if scroll is needed and available.
    if (isNeeded && isAvailable) {
      // Calculates how much will scroll every step.
      const step =
        Math.round(available / 20) || Math.round(available / 15) || Math.round(available / 10);

      // Initializes remaining scroll.
      let remaining = available;
      let isNotRemaining;

      // Interval will be stored.
      let interval;

      // Starts animation and sets interval.
      const task = yield fork(() =>
        new Promise(resolve => {
          interval = setInterval(() => {
            // Scrolls one step.
            nav.scrollLeft += step;
            remaining -= step;
            isNotRemaining = !Math.abs(remaining);

            // If remaining scroll is less than one step, scrolls remaining.
            if (
              (available < 0 && remaining - step > 0) ||
              (available > 0 && remaining - step < 0)
            ) {
              nav.scrollLeft += remaining;
              resolve(interval);
            }

            // Returns if not remaining scroll.
            if (isNotRemaining) resolve(interval);
          }, 7);
        }).then(result => clearInterval(result))
      );

      // Stores scroll interval
      yield put(actions.nav.navScrollStarted({ interval }));
      yield join(task);
      yield put(actions.nav.navScrollFinished());
    }
  }
}

function* navScrollWatcher() {
  const CLIENT_REACT_RENDERED = dep('build', 'types', 'CLIENT_REACT_RENDERED');
  const ROUTE_CHANGE_SUCCEED = dep('router', 'types', 'ROUTE_CHANGE_SUCCEED');

  yield all([
    takeEvery(CLIENT_REACT_RENDERED, navScroll),
    takeEvery(ROUTE_CHANGE_SUCCEED, navScroll)
  ]);
}

export default function* navSagas() {
  yield fork(navScrollWatcher);
}

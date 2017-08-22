import { put, select, fork, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* closeMenuOnRouteChange() {
  const isOpen = yield select(state => selectors.menu.isOpen(state));

  if (isOpen) yield put(actions.menu.hasClosed());
}

function* closeMenuOnRouteChangeWatcher() {
  const ROUTE_CHANGE_REQUESTED = dep('router', 'types', 'ROUTE_CHANGE_REQUESTED');

  yield takeEvery(ROUTE_CHANGE_REQUESTED, closeMenuOnRouteChange);
}

export default function* menuSagas() {
  yield fork(closeMenuOnRouteChangeWatcher);
}

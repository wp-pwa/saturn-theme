import { put, select, fork, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { dep } from 'worona-deps';

function* closeMenuOnRouteChange() {
  const isOpen = yield select(state => selectors.menu.isOpen(state));

  if (isOpen) yield put(actions.menu.hasClosed());
}

function* closeMenuOnRouteChangeWatcher() {
  const ROUTE_CHANGE_SUCCEED = dep('router', 'types', 'ROUTE_CHANGE_SUCCEED');

  yield takeEvery(ROUTE_CHANGE_SUCCEED, closeMenuOnRouteChange);
}

export default function* menuSagas() {
  yield fork(closeMenuOnRouteChangeWatcher);
}

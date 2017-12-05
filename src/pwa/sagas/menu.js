import { put, select, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* closeMenuOnRouteChange() {
  const isOpen = yield select(state => selectors.menu.isOpen(state));

  if (isOpen) yield put(actions.menu.hasClosed());
}

export default function* menuSagas() {
  yield takeEvery(
    dep('connection', 'actionTypes', 'ROUTE_CHANGE_REQUESTED'),
    closeMenuOnRouteChange,
  );
}

import { race, take, put, select } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import { home, single } from '../contexts';

export function* waitForList({ type, id, page }) {
  const LIST_SUCCEED = dep('connection', 'actionTypes', 'LIST_SUCCEED');
  const LIST_FAILED = dep('connection', 'actionTypes', 'LIST_FAILED');
  yield race({
    succeed: take(
      action =>
        action.type === LIST_SUCCEED &&
        action.list.type === type &&
        action.list.id === id &&
        action.list.page === page,
    ),
    failed: take(
      action =>
        action.type === LIST_FAILED &&
        action.list.type === type &&
        action.list.id === id &&
        action.page === page,
    ),
  });
}

export function* waitForEntity({ type, id }) {
  const ENTITY_SUCCEED = dep('connection', 'actionTypes', 'ENTITY_SUCCEED');
  const ENTITY_FAILED = dep('connection', 'actionTypes', 'ENTITY_FAILED');
  yield race({
    succeed: take(
      action =>
        action.type === ENTITY_SUCCEED && action.entity.type === type && action.entity.id === id,
    ),
    failed: take(
      action =>
        action.type === ENTITY_FAILED && action.entity.type === type && action.entity.id === id,
    ),
  });
}

export function* waitForCustom({ name, page }) {
  const CUSTOM_SUCCEED = dep('connection', 'actionTypes', 'CUSTOM_SUCCEED');
  const CUSTOM_FAILED = dep('connection', 'actionTypes', 'CUSTOM_FAILED');
  yield race({
    succeed: take(
      action =>
        action.type === CUSTOM_SUCCEED &&
        action.custom.name === name &&
        action.custom.page === page,
    ),
    failed: take(
      action =>
        action.type === CUSTOM_FAILED && action.custom.name === name && action.custom.page === page,
    ),
  });
}

export default function* saturnServerSaga({ selectedItem }) {
  yield take(dep('connection', 'actionTypes', 'CONNECTION_INITIALIZED'));
  const routeChangeSucceed = dep('connection', 'actions', 'routeChangeSucceed');

  if (selectedItem.page) {
    const menu = yield select(dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu'));
    const context = home(menu);
    const action = { selectedItem, context };
    yield put(routeChangeSucceed(action));
    yield waitForList(selectedItem);
  } else {
    const context = single();
    const action = { selectedItem, context };
    yield put(routeChangeSucceed(action));
    yield waitForEntity(selectedItem);
  }
}

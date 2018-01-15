import { fork, spawn, take, put, all } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import pwaServerSagas, { waitForList, waitForSingle } from '../../pwa/sagas/server';
import { allShareCountWatcher, shareCountWatcher } from './share';
import * as actions from '../../pwa/actions';
import * as actionTypes from '../../pwa/actionTypes';

function* shareRequests(selected) {
  yield waitForSingle({ singleId: selected.singleId, singleType: selected.singleType });

  yield put(actions.share.allShareCountRequested({ id: selected.singleId, wpType: 'post' }));
}

export default function* ampServerSagas({ stores, selected }) {
  yield fork(pwaServerSagas, { selected });

  yield take(dep('build', 'actionTypes', 'SERVER_SAGAS_INITIALIZED'));

  if (selected.singleId) {
    yield spawn(allShareCountWatcher, stores);
    yield spawn(shareCountWatcher);
    yield fork(shareRequests, selected);

    const listRequested = dep('connection', 'actions', 'listRequested');

    yield put(listRequested({ listType: 'latest', listId: 'post', page: 1 }));

    yield all([
      waitForList({ listType: 'latest', listId: 'post', page: 1 }),
      take(actionTypes.ALL_SHARE_COUNT_RESOLVED)
    ]);
  }
}

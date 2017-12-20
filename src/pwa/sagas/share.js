/* eslint-disable no-underscore-dangle */
import { take, join, fork, put, call, select, all, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as selectorCreators from '../selectorCreators';

// This are the HTTP requests to get share counts from different networks.
const shareCountRequests = {
  *facebook(url) {
    const endpoint = `https://graph.facebook.com/?id=${url}`;
    const res = yield request.get(endpoint);

    return res.body.share.share_count;
  },
  *linkedin(url) {
    const endpoint = 'https://cors.worona.io/https://www.linkedin.com/countserv/count/share';
    const res = yield request.get(endpoint).query({ url, format: 'json' });

    return res.body.count;
  },
  *google(url) {
    const endpoint = 'https://clients6.google.com/rpc';
    const res = yield request.post(endpoint).send({
      method: 'pos.plusones.get',
      id: 'p',
      params: {
        nolog: true,
        id: url,
        source: 'widget',
        userId: '@viewer',
        groupId: '@self'
      },
      jsonrpc: '2.0',
      key: 'p',
      apiVersion: 'v1'
    });

    return res.body.result.metadata.globalCounts.count;
  }
};

// This saga waits for a single share count request to be done.
// It's used inside allShareCountRequested saga.
function* waitShareCount({ network, id }) {
  yield take(
    action =>
      (action.type === actionTypes.SHARE_COUNT_SUCCEED ||
        action.type === actionTypes.SHARE_COUNT_FAILED) &&
      network === action.network &&
      id === action.id
  );
}

// This saga starts the whole process of updating share counts. It's listening for
// shareModalOpeningFinished action, and dispatchs allShareCountRequested.
function* shareModalOpening() {
  const id = yield select(selectors.share.getId);
  const wpType = yield select(selectors.share.getWpType);
  const shareReady = yield select(selectorCreators.share.areCountsReady(id));

  if (!shareReady) {
    yield put(actions.share.allShareCountRequested({ id, wpType }));
  }
}

// This saga dispatchs every shareCountRequested action
// and waits for them to be done.
function* allShareCountRequested(stores, { id }) {
  const networks = Object.keys(shareCountRequests);
  const link = stores.connection.single.post[id]._link;

  const tasks = yield all(networks.map(network => fork(waitShareCount, { network, id })));
  yield all(networks.map(network => put(actions.share.shareCountRequested({ network, id, link }))));
  yield all(tasks.map(task => join(task)));

  yield put(actions.share.allShareCountResolved({ id }));
}

// This saga is listening for shareCountRequested actions
// and calls the corresponding HTTP request.
function* shareCountRequested(action) {
  const { network, id, link } = action;

  try {
    const value = yield call(shareCountRequests[network], link);
    yield put(actions.share.shareCountSucceed({ network, id, value }));
  } catch (e) {
    yield put(actions.share.shareCountFailed({ network, id }));
  }
}

function* shareModalOpeningWatcher() {
  yield takeEvery(actionTypes.SHARE_MODAL_OPENING_FINISHED, shareModalOpening);
}

function* allShareCountWatcher(stores) {
  yield takeEvery(actionTypes.ALL_SHARE_COUNT_REQUESTED, allShareCountRequested, stores);
}

function* shareCountWatcher() {
  yield takeEvery(actionTypes.SHARE_COUNT_REQUESTED, shareCountRequested);
}

export default function* postSliderSagas(stores) {
  yield all([
    fork(shareModalOpeningWatcher),
    fork(allShareCountWatcher, stores),
    fork(shareCountWatcher)
  ]);
}

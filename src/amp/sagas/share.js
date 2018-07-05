/* eslint-disable no-underscore-dangle */
import {
  take,
  join,
  fork,
  put,
  call,
  all,
  takeEvery,
} from 'redux-saga/effects';
import request from 'superagent';
import { getContent } from '../../shared/helpers';
import * as actionTypes from '../../pwa/actionTypes';
import * as actions from '../../pwa/actions';

// This are the HTTP requests to get share counts from different networks.
const shareCountRequests = {
  *facebook(url) {
    const endpoint = `https://graph.facebook.com/?id=${url}`;
    const res = yield request.get(endpoint).accept('json');

    return res.body.share.share_count;
  },
  *linkedin(url) {
    const endpoint =
      'https://cors.worona.io/https://www.linkedin.com/countserv/count/share';
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
        groupId: '@self',
      },
      jsonrpc: '2.0',
      key: 'p',
      apiVersion: 'v1',
    });

    return res.body.result.metadata.globalCounts.count;
  },
  *pinterest(url) {
    const endpoint = `https://api.pinterest.com/v1/urls/count.json?url=${url}`;

    const res = yield getContent(endpoint);
    const data = /receiveCount\((.+)\)/.exec(res);

    return data ? JSON.parse(data[1]).count : 0;
  },
};

// This saga waits for a single share count request to be done.
// It's used inside allShareCountRequested saga.
function* waitShareCount({ network, id }) {
  yield take(
    action =>
      (action.type === actionTypes.SHARE_COUNT_SUCCEED ||
        action.type === actionTypes.SHARE_COUNT_FAILED) &&
      network === action.network &&
      id === action.id,
  );
}

// This saga dispatchs every shareCountRequested action
// and waits for them to be done.
function* allShareCountRequested({ connection }, { id }) {
  const networks = Object.keys(shareCountRequests);
  const { link } = connection.entity('post', id);
  const tasks = yield all(
    networks.map(network => fork(waitShareCount, { network, id })),
  );

  yield all(
    networks.map(network =>
      put(actions.share.shareCountRequested({ network, id, link })),
    ),
  );
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

export function* allShareCountWatcher(stores) {
  yield takeEvery(
    actionTypes.ALL_SHARE_COUNT_REQUESTED,
    allShareCountRequested,
    stores,
  );
}

export function* shareCountWatcher() {
  yield takeEvery(actionTypes.SHARE_COUNT_REQUESTED, shareCountRequested);
}

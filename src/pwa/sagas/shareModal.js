import { take, join, fork, put, call, select, all, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { dep } from 'worona-deps';
import * as types from '../types';
import * as actions from '../actions';
import * as selectors from '../selectors';

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
        groupId: '@self',
      },
      jsonrpc: '2.0',
      key: 'p',
      apiVersion: 'v1',
    });

    return res.body.result.metadata.globalCounts.count;
  },
};

// This saga waits for a single share count request to be done.
// It's used inside allShareCountRequested saga.
function* waitShareCount({ network, id }) {
  yield take(
    action =>
      (action.type === types.SHARE_COUNT_SUCCEED || action.type === types.SHARE_COUNT_FAILED) &&
      network === action.network &&
      id === action.id
  );
}

// This saga starts the whole process of updating share counts. It's listening for
// shareModalOpeningFinished action, and dispatchs allShareCountRequested.
function* shareModalOpening() {
  const id = yield select(selectors.shareModal.getId);
  const wpType = yield select(selectors.shareModal.getWpType);

  yield put(actions.shareModal.allShareCountRequested({ id, wpType }));
}

// This saga dispatchs every shareCountRequested action
// and waits for them to be done.
function* allShareCountRequested(action) {
  const { id, wpType } = action;
  const networks = Object.keys(shareCountRequests);
  const { link } = yield select(dep('connection', 'selectorCreators', 'getWpTypeById')(wpType, id));

  const tasks = yield all(networks.map(network => fork(waitShareCount, { network, id })));
  yield all(
    networks.map(network => put(actions.shareModal.shareCountRequested({ network, id, link })))
  );
  yield all(tasks.map(task => join(task)));

  yield put(actions.shareModal.allShareCountResolved({ id }));
}

// This saga is listening for shareCountRequested actions
// and calls the corresponding HTTP request.
function* shareCountRequested(action) {
  const { network, id, link } = action;

  try {
    const value = yield call(shareCountRequests[network], link);
    yield put(actions.shareModal.shareCountSucceed({ network, id, value }));
  } catch (e) {
    yield put(actions.shareModal.shareCountFailed({ network, id }));
  }
}

function* shareModalOpeningWatcher() {
  yield takeEvery(types.SHARE_MODAL_OPENING_FINISHED, shareModalOpening);
}

function* allShareCountWatcher() {
  yield takeEvery(types.ALL_SHARE_COUNT_REQUESTED, allShareCountRequested);
}

function* shareCountWatcher() {
  yield takeEvery(types.SHARE_COUNT_REQUESTED, shareCountRequested);
}

export default function* postSliderSagas() {
  yield all([fork(shareModalOpeningWatcher), fork(allShareCountWatcher), fork(shareCountWatcher)]);
}

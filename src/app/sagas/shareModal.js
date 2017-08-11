import { takeEvery } from 'redux-saga';
import { take, fork, put, call, select } from 'redux-saga/effects';
import * as getters from 'react-share/lib/share-count-getters';
import * as types from '../types';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as deps from '../deps';

const shareCountGetters = {
  facebook: getters.getFacebookShareCount,
  linkedin: getters.getLinkedinShareCount,
  google: getters.getGooglePlusShareCount,
};

function shareCountPromise(getter, url) {
  return new Promise((resolve, reject) => {
    getter(url, value => (typeof value === 'number' ? resolve({ value }) : reject({ value })));
  });
}

function* shareModalOpening() {
  const id = yield select(selectors.shareModal.getId);
  const wpType = yield select(selectors.shareModal.getWpType);
  const entity = yield select(deps.selectorCreators.getWpTypeById(wpType, id));

  yield put(actions.shareModal.allShareCountRequested({ entity }));
}

function* allShareCountRequested(action) {
  const { entity } = action;
  const { id } = entity;
  const networks = Object.keys(shareCountGetters);

  try {
    let totalFinished = 0;
    let totalSucceed = 0;

    yield networks.map(network => put(actions.shareModal.shareCountRequested({ network, entity })));

    const requestCounter = ({ type }) => {
      if (type === types.SHARE_COUNT_SUCCEED) {
        totalSucceed += 1;
        totalFinished += 1;
      } else if (type === types.SHARE_COUNT_FAILED) {
        totalFinished += 1;
      }

      return true;
    };

    while (totalFinished < networks.length) yield take(requestCounter);

    if (totalSucceed === networks.length) {
      yield put(actions.shareModal.allShareCountSucceed({ id }));
    } else {
      yield put(actions.shareModal.allShareCountFailed({ id }));
    }
  } catch (e) {
    yield put(actions.shareModal.allShareCountFailed({ id }));
  }
}

function* shareCountRequested(action) {
  const { network, entity } = action;
  const { id } = entity;

  try {
    const shareCount = yield call(shareCountPromise, shareCountGetters[network], entity.link);

    yield put(actions.shareModal.shareCountSucceed({ id, network, value: shareCount.value }));
  } catch (e) {
    yield put(actions.shareModal.shareCountFailed({ id, network }));
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
  yield [fork(shareModalOpeningWatcher), fork(allShareCountWatcher), fork(shareCountWatcher)];
}

import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import * as countGetters from 'react-share/lib/share-count-getters';
import * as actions from '../actions';
import * as types from '../types';
import * as deps from '../deps';

const mapNetworkToGetter = {
  facebook: countGetters.getFacebookShareCount,
  linkedin: countGetters.getLinkedinShareCount,
  google: countGetters.getGooglePlusShareCount,
  pinterest: countGetters.getPinterestShareCount,
  vk: countGetters.getVKShareCount,
  ok: countGetters.getOKShareCount,
  reddit: countGetters.getRedditShareCount,
};

const countPromise = (getter, url) =>
  new Promise((resolve, reject) => {
    getter(url, value => (typeof value === 'number' ? resolve({ value }) : reject({ value })));
  });

function* getSingleCount(network, entity) {
  try {
    const response = yield call(countPromise, mapNetworkToGetter[network], entity.link);
    yield put(actions.shareModal.countSucceed({ id: entity.id, network, value: response.value }));
  } catch (e) {
    return;
  }
}

function* shareCountsSaga(action) {
  const entity = yield select(deps.selectorCreators.getWpTypeById(action.wpType, action.id));
  yield [
    call(getSingleCount, 'facebook', entity),
    call(getSingleCount, 'linkedin', entity),
    call(getSingleCount, 'google', entity),
    call(getSingleCount, 'pinterest', entity),
    call(getSingleCount, 'vk', entity),
    call(getSingleCount, 'ok', entity),
    call(getSingleCount, 'reddit', entity),
  ];
  yield put(actions.shareModal.allCountSucceed({ id: action.id }));
}

export default function* ivorySagas() {
  yield takeEvery(types.ALL_SHARE_COUNT_REQUESTED, shareCountsSaga);
}

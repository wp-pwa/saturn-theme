import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';

function classicVersion() {
  window.document.cookie = 'woronaClassicVersion=true;path=/';
  window.location.reload(true);
}

export default function* footerSagas() {
  yield takeEvery(actionTypes.CLASSIC_VERSION_REQUESTED, classicVersion);
}

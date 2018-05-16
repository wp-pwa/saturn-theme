import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";

function classicVersion() {
  window.document.cookie = "wppwaClassicVersion=true;path=/";
  window.location.reload(true);
}

export default function* classicSagas() {
  yield takeEvery(actionTypes.CLASSIC_VERSION_REQUESTED, classicVersion);
}

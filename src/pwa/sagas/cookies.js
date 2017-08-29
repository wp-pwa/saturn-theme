/* global localStorage */
import { put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { COOKIES_HAVE_BEEN_REQUESTED } from '../types';
import { cookies } from '../actions';

function* cookiesHaveBeenRequested() {
  yield localStorage.setItem('cookiesAccepted', true);

  yield put(cookies.haveBeenAccepted());
}

export default function* cookiesHaveBeenRequestedWatcher() {
  yield takeEvery(COOKIES_HAVE_BEEN_REQUESTED, cookiesHaveBeenRequested);
}

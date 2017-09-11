/* global localStorage */
import { put, take, fork } from 'redux-saga/effects';
import * as types from '../types';
import { cookies } from '../actions';

function* cookiesWatcher() {
  const areCookiesAccepted = localStorage.getItem('cookiesAccepted');

  if (areCookiesAccepted) return;

  yield put(cookies.haveBeenRequested());

  yield take(types.COOKIES_HAVE_BEEN_ACCEPTED);

  yield localStorage.setItem('cookiesAccepted', true);
}

export default function* cookiesSaga() {
  yield fork(cookiesWatcher);
}

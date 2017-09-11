/* global localStorage */
import { put, take, fork } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import * as types from '../types';
import { cookies } from '../actions';

function* cookiesWatcher() {
  yield take(dep('build', 'types', 'CLIENT_REACT_RENDERED'));

  const areCookiesAccepted = localStorage.getItem('cookiesAccepted');

  if (areCookiesAccepted) return;

  yield put(cookies.haveBeenRequested());

  yield take(types.COOKIES_HAVE_BEEN_ACCEPTED);

  yield localStorage.setItem('cookiesAccepted', true);
}

export default function* cookiesSaga() {
  yield fork(cookiesWatcher);
}

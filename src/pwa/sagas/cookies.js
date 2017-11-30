import { put, take, fork } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import * as actionTypes from '../actionTypes';
import { cookies } from '../actions';

function* cookiesWatcher() {
  yield take(dep('build', 'types', 'CLIENT_REACT_RENDERED'));

  const areCookiesAccepted = window.localStorage.getItem('cookiesAccepted');

  if (areCookiesAccepted) return;

  yield put(cookies.haveBeenRequested());

  yield take(actionTypes.COOKIES_HAVE_BEEN_ACCEPTED);

  try {
    yield window.localStorage.setItem('cookiesAccepted', true);
  } catch (e) {
    console.warn(e);
  }
}

export default function* cookiesSagas() {
  yield fork(cookiesWatcher);
}

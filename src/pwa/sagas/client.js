import { fork, all } from 'redux-saga/effects';
import shareSagas from './share';
import requestSagas from './request';
import menuSagas from './menu';
import scrollSagas from './scroll';
import cookiesSagas from './cookies';
import classicSagas from './classic';
import oneSignalSagas from './oneSignal';

export default function* saturnSagas({ stores }) {
  yield all([
    fork(shareSagas, stores),
    fork(requestSagas, stores),
    fork(menuSagas),
    fork(scrollSagas),
    fork(cookiesSagas),
    fork(classicSagas),
    fork(oneSignalSagas),
  ]);
}

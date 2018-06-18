import { fork, all } from 'redux-saga/effects';
import requestSagas from './request';
import scrollSagas from './scroll';
import oneSignalSagas from './oneSignal';

export default function* saturnSagas({ stores }) {
  yield all([
    fork(requestSagas, stores),
    fork(scrollSagas),
    fork(oneSignalSagas),
  ]);
}

import { fork, all } from 'redux-saga/effects';
import shareModalSagas from './shareModal';
import listSagas from './list';
import postSagas from './post';
import menuSagas from './menu';
import prefetchSagas from './prefetch';
import cookiesSagas from './cookies';
import footerSagas from './footer';
import oneSignalSagas from './oneSignal';
import analyticsSagas from './analytics';

export default function* saturnSagas() {
  yield all([
    fork(shareModalSagas),
    fork(listSagas),
    fork(postSagas),
    fork(menuSagas),
    fork(prefetchSagas),
    fork(cookiesSagas),
    fork(footerSagas),
    fork(oneSignalSagas),
    fork(analyticsSagas),
  ]);
}

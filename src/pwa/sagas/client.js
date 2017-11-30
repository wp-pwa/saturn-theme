import { fork, all } from 'redux-saga/effects';
import shareSagas from './share';
import listSagas from './list';
// import postSagas from './post';
// import menuSagas from './menu';
// import prefetchSagas from './prefetch';
// import cookiesSagas from './cookies';
// import footerSagas from './footer';
// import oneSignalSagas from './oneSignal';
// import analyticsSagas from './analytics';

export default function* saturnSagas({ stores }) {
  yield all([
    fork(shareSagas, stores),
    fork(listSagas, stores),
    // fork(postSagas),
    // fork(menuSagas),
    // fork(prefetchSagas),
    // fork(cookiesSagas),
    // fork(footerSagas),
    // fork(oneSignalSagas),
    // fork(analyticsSagas),
  ]);
}

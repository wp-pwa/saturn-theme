import { fork, all } from "redux-saga/effects";
import shareSagas from "./share";
import requestSagas from "./request";
import menuSagas from "./menu";
import scrollSagas from "./scroll";
// import prefetchSagas from './prefetch';
// import cookiesSagas from './cookies';
// import footerSagas from './footer';
import oneSignalSagas from './oneSignal';
import analyticsSagas from './analytics';

export default function* saturnSagas({ stores }) {
  yield all([
    fork(shareSagas, stores),
    fork(requestSagas, stores),
    fork(menuSagas),
    fork(scrollSagas),
    // fork(prefetchSagas),
    // fork(cookiesSagas),
    // fork(footerSagas),
    fork(oneSignalSagas),
    fork(analyticsSagas, stores),
  ]);
}

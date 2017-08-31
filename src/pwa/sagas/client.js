import { fork, all } from 'redux-saga/effects';
import shareModalSagas from './shareModal';
import postSagas from './post';
import menuSagas from './menu';
// import cookiesHaveBeenRequested from './cookies';

export default function* saturnSagas() {
  yield all([
    fork(shareModalSagas),
    fork(postSagas),
    fork(menuSagas),
    // fork(cookiesHaveBeenRequested),
  ]);
}

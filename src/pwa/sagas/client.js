import { fork, all } from 'redux-saga/effects';
import shareModalSagas from './shareModal';
import postSliderSagas from './postSlider';
import menuSagas from './menu';
// import cookiesHaveBeenRequested from './cookies';

export default function* saturnSagas() {
  yield all([
    fork(shareModalSagas),
    fork(postSliderSagas),
    fork(menuSagas),
    // fork(cookiesHaveBeenRequested),
  ]);
}

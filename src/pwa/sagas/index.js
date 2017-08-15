import { fork } from 'redux-saga/effects';
import shareModalSagas from './shareModal';
import postSliderSagas from './postSlider';
import cookiesHaveBeenRequested from './cookies';

export default function* saturnSagas() {
  yield [
    fork(shareModalSagas),
    fork(postSliderSagas),
    fork(cookiesHaveBeenRequested),
  ];
}

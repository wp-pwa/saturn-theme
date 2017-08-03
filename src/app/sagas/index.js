import { fork } from 'redux-saga/effects';
import shareModalSagas from './shareModal';
import postSliderSagas from './postSlider';

export default function* saturnSagas() {
  yield [
    fork(shareModalSagas),
    fork(postSliderSagas),
  ];
}

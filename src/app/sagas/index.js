import { fork } from 'redux-saga/effects';
import shareModalSagas from './shareModal';

export default function* saturnSagas() {
  yield [
    fork(shareModalSagas),
  ];
}

import { call } from 'redux-saga/effects';
import { dep } from 'worona-deps';

export default function* prefetchSagas() {
  const prefetch = dep('router', 'sagaHelpers', 'prefetch');
  yield call(prefetch, { dynamicImport: () => import('../components/Post'), ms: 3000 });
  yield call(prefetch, { dynamicImport: () => import('../components/List'), ms: 3000 });
}

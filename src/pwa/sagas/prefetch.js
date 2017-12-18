import { call } from "redux-saga/effects";
import { delay } from "redux-saga";

export function* prefetch({ dynamicImport, ms }) {
  if (ms) yield delay(ms);
  yield call(dynamicImport);
}

export default function* prefetchSagas() {
  yield call(prefetch, { dynamicImport: () => import("../components/Post"), ms: 3000 });
  yield call(prefetch, { dynamicImport: () => import("../components/List"), ms: 3000 });
}

import { put, fork, select, all, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import * as actions from "../actions";

function* handleBarsOnScroll(action) {
  const hiddenBars = yield select(state => state.theme.bars.hidden);
  const { direction } = action;

  if (direction === "up" && !hiddenBars) {
    yield put(actions.scroll.barsHaveHidden());
  } else if (direction === "down" && hiddenBars) {
    yield put(actions.scroll.barsHaveShown());
  }
}

function* handleBarsOnScrollWatcher() {
  yield takeEvery(actionTypes.WINDOW_HAS_SCROLLED, handleBarsOnScroll);
}

export default function* scrollSagas() {
  yield all([fork(handleBarsOnScrollWatcher)]);
}

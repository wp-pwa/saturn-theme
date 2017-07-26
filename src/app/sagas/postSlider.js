import { take, put } from 'redux-saga/effects';
import { ACTIVE_POST_SLIDE_CHANGED } from '../types';
import { actions, types } from '../deps';

export default function* () {
  //eslint-disable-next-line
  while (true) {
    const action = yield take(ACTIVE_POST_SLIDE_CHANGED);

    if (action.activeSlide >= action.sliderLength - 2) {
      yield put(actions.anotherPostsPageRequested());
      yield take(
        ({ type, name }) =>
          (type === types.ANOTHER_POSTS_PAGE_SUCCEED || type === types.ANOTHER_POSTS_PAGE_FAILED) &&
          name === 'currentList'
      );
    }
  }
}

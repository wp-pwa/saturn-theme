import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import { parse } from 'url';
import Router from '@worona/next/router';
import * as types from '../types';
import * as selectors from '../selectors';

function* handleListRequest() {
  const activeSlide = yield select(selectors.list.getActiveSlide);

  if (activeSlide < 0) return;

  const lists = yield select(selectors.list.getLists);
  const currentLists = lists.slice(activeSlide ? activeSlide - 1 : activeSlide, activeSlide + 2);
  const readyLists = yield all(
    currentLists.map(({ id, type }) =>
      select(dep('connection', 'selectorCreators', 'isListReady')(`${type}${id || ''}`)),
    ),
  );
  const updateLists = currentLists.filter((_list, index) => !readyLists[index]);

  const pluralTypes = dep('connection', 'constants', 'wpTypesSingularToPlural');

  yield all(
    updateLists.map(({ id, type }) => {
      if (type === 'latest')
        return put(
          dep('connection', 'actions', 'newPostsListRequested')({ params: {}, name: type }),
        );

      return put(
        dep('connection', 'actions', 'newPostsListRequested')({
          params: { [pluralTypes[type]]: id },
          name: `${type}${id || ''}`,
        }),
      );
    }),
  );
}

function* handleRouteChange(action) {
  const { id, wpType } = action;
  const siteId = yield select(dep('settings', 'selectors', 'getSiteId'));
  const selectorName = `get${wpType
    .slice(0, 1)
    .toUpperCase()
    .concat(wpType.slice(1))}ById`;

  if (wpType === 'latest') {
    Router.push(`/?siteId=${siteId}`, '/');
  } else {
    const entity = yield select(dep('connection', 'selectorCreators', selectorName)(id));

    if (entity && entity.link) {
      const taxonomies = {
        category: 'cat',
        tag: 'tag',
        author: 'author',
      };

      const as = parse(entity.link).path;
      const url = `/?siteId=${siteId}&${taxonomies[wpType]}=${id}`;

      Router.push(url, as);
    }
  }
}

function* clientRenderWatcher() {
  yield takeEvery(dep('build', 'types', 'CLIENT_REACT_RENDERED'), handleListRequest);
}

function* routeChangeWatcher() {
  yield takeEvery(dep('router', 'types', 'ROUTE_CHANGE_SUCCEED'), handleListRequest);
}

function* slideChangeWatcher() {
  yield takeEvery(types.ACTIVE_LIST_SLIDE_HAS_CHANGED, handleRouteChange);
}

export default function* listSagas() {
  yield all([call(clientRenderWatcher), call(routeChangeWatcher), call(slideChangeWatcher)]);
}

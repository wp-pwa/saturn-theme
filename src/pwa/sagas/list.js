import { all, call, put, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';
// import { parse } from 'url';
// import Router from '@worona/next/router';
// import * as actionTypes from '../actionTypes';
// import * as selectors from '../selectors';

function* handleListRequest({ connection }) {
  const { id } = connection.selected;
  const context = connection.context.columns;
  const activeSlide = context.findIndex(column =>
    column.items.find(item => item.singleId === id || item.listId === id),
  );

  if (activeSlide < 0) return;

  const lists = context.map(list => list.items[0]);
  const currentLists =
    activeSlide + 3 > lists.length
      ? lists
          .slice(activeSlide ? activeSlide - 1 : activeSlide, activeSlide + 3)
          .concat(lists.slice(0, (activeSlide + 3) % lists.length))
      : lists.slice(activeSlide ? activeSlide - 1 : activeSlide, activeSlide + 3);

  const readyLists = currentLists.map(
    ({ listId, listType }) => connection.list[listType][listId].ready,
  );

  const updateLists = currentLists.filter((_list, index) => !readyLists[index]);

  yield all(
    updateLists.map(({ listId, listType }) =>
      put(
        dep('connection', 'actions', 'listRequested')({
          listId,
          listType,
        }),
      ),
    ),
  );
}

// function* handleRouteChange(action) {
//   const { id, wpType } = action;
//   const siteId = yield select(dep('settings', 'selectors', 'getSiteId'));
//   const selectorName = `get${wpType
//     .slice(0, 1)
//     .toUpperCase()
//     .concat(wpType.slice(1))}ById`;
//
//   if (wpType === 'latest') {
//     Router.push(`/?siteId=${siteId}`, '/');
//   } else {
//     const entity = yield select(dep('connection', 'selectorCreators', selectorName)(id));
//
//     if (entity && entity.link) {
//       const taxonomies = {
//         category: 'cat',
//         tag: 'tag',
//         author: 'author',
//       };
//
//       const as = parse(entity.link).path;
//       const url = `/?siteId=${siteId}&${taxonomies[wpType]}=${id}`;
//
//       Router.push(url, as);
//     }
//   }
// }

// function* routeChangeWatcher() {
//   yield takeEvery(dep('router', 'types', 'ROUTE_CHANGE_SUCCEED'), handleListRequest);
// }

// function* slideChangeWatcher() {
//   yield takeEvery(actionTypes.ACTIVE_LIST_SLIDE_HAS_CHANGED, handleRouteChange);
// }

function* clientRenderWatcher(stores) {
  yield takeEvery(dep('build', 'actionTypes', 'CLIENT_RENDERED'), handleListRequest, stores);
}

export default function* listSagas(stores) {
  yield all([
    call(clientRenderWatcher, stores),
    // call(routeChangeWatcher),
    // call(slideChangeWatcher)
  ]);
}

import {
  race,
  // fork,
  // join,
  take,
  put,
  select,
  // all
} from 'redux-saga/effects';
import { dep } from 'worona-deps';

// const getSetting = (namespace, setting) =>
//   dep('settings', 'selectorCreators', 'getSetting')(namespace, setting);
//
// // Selector creator that gets a list of element ids from menu with a specific type.
// const menuTypeIds = type => state =>
//   getSetting('theme', 'menu')(state)
//     .filter(element => element.type === type)
//     .map(element => element[type]);
//
// const requestNewTags = () => dep('connection', 'actions', 'newTagsListRequested');
// const requestNewCategories = () => dep('connection', 'actions', 'newCategoriesListRequested');
//
// const menuTagsFinished = action =>
//   action.name === 'menuTags' &&
//   (action.type === dep('connection', 'types', 'NEW_TAGS_LIST_SUCCEED') ||
//     action.type === dep('connection', 'types', 'NEW_TAGS_LIST_FAILED'));
//
// const menuCategoriesFinished = action =>
//   action.name === 'menuCategories' &&
//   (action.type === dep('connection', 'types', 'NEW_CATEGORIES_LIST_SUCCEED') ||
//     action.type === dep('connection', 'types', 'NEW_CATEGORIES_LIST_FAILED'));
//
// function* requestMenuType({ action, type, name, waitFor }) {
//   const typeIds = yield select(menuTypeIds(type));
//   if (typeIds.length === 0) return; // If the list is empty, it does nothing.
//
//   const waitTask = yield fork(function* wait() {
//     yield take(waitFor);
//   });
//   yield put(action({ name, params: { _embed: true, include: typeIds } }));
//   yield join(waitTask);
// }
//
// function* requestHomeListOnPost() {
//   const requestNewPostList = dep('connection', 'actions', 'newPostsListRequested');
//   const isPost = (yield select(dep('router', 'selectors', 'getType'))) === 'post';
//
//   if (isPost) {
//     yield put(requestNewPostList());
//
//     yield take(
//       ({ type, name }) =>
//         (type === dep('connection', 'types', 'NEW_POSTS_LIST_SUCCEED') ||
//           type === dep('connection', 'types', 'NEW_POSTS_LIST_FAILED')) &&
//         name === 'currentList',
//     );
//   }
// }
//
// function* requestActiveSlidePostList() {
//   const requestNewPostList = dep('connection', 'actions', 'newPostsListRequested');
//   const id = yield select(dep('router', 'selectors', 'getId'));
//   const wpType = yield select(dep('router', 'selectors', 'getType'));
//   const pluralTypes = dep('connection', 'constants', 'wpTypesSingularToPlural');
//
//   if (['latest', 'category', 'tag', 'author'].includes(wpType)) {
//     const listName = `${wpType}${id || ''}`;
//     const params = listName === 'latest' ? {} : { [pluralTypes[wpType]]: id };
//
//     yield put(requestNewPostList({ params, name: listName }));
//
//     yield take(
//       ({ type, name }) =>
//         (type === dep('connection', 'types', 'NEW_POSTS_LIST_SUCCEED') ||
//           type === dep('connection', 'types', 'NEW_POSTS_LIST_FAILED')) &&
//         name === listName,
//     );
//   }
// }

function* waitForList({ listType, listId, page }) {
  const LIST_SUCCEED = dep('connection', 'actionTypes', 'LIST_SUCCEED');
  const LIST_FAILED = dep('connection', 'actionTypes', 'LIST_FAILED');
  yield race({
    succeed: take(
      action =>
        action.type === LIST_SUCCEED &&
        action.listType === listType &&
        action.listId === listId &&
        action.page === page,
    ),
    failed: take(
      action =>
        action.type === LIST_FAILED &&
        action.listType === listType &&
        action.listId === listId &&
        action.page === page,
    ),
  });
}

function* waitForSingle({ singleType, singleId }) {
  const SINGLE_SUCCEED = dep('connection', 'actionTypes', 'SINGLE_SUCCEED');
  const SINGLE_FAILED = dep('connection', 'actionTypes', 'SINGLE_FAILED');
  yield race({
    succeed: take(
      action =>
        action.type === SINGLE_SUCCEED &&
        action.singleType === singleType &&
        action.singleId === singleId,
    ),
    failed: take(
      action =>
        action.type === SINGLE_FAILED &&
        action.singleType === singleType &&
        action.singleId === singleId,
    ),
  });
}

export default function* saturnServerSaga({
  selected: { singleType, singleId, listType, listId, page },
}) {
  yield take(dep('build', 'actionTypes', 'SERVER_SAGAS_INITIALIZED'));
  const routeChangeSucceed = dep('connection', 'actions', 'routeChangeSucceed');

  if (listType) {
    const menuList = (yield select(
      dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu'),
    ))
      .filter(({ type }) => ['latest', 'category', 'tag', 'author'].includes(type))
      .map(list => {
        const id = list.type === 'latest' ? 'post' : parseInt(list[list.type], 10);
        return {
          listType: list.type,
          listId: id,
          page: 1,
        };
      });

    yield put(
      routeChangeSucceed({
        selected: { listType, listId, page },
        context: {
          items: menuList,
          infinite: false,
        },
      }),
    );
    yield waitForList({ listType, listId, page });
  } else {
    yield put(
      routeChangeSucceed({
        selected: { singleType, singleId },
        context: {
          items: [{ singleId, singleType }, { listId: 'post', listType: 'latest', extract: true }],
        },
      }),
    );
    yield waitForSingle({ singleType, singleId });
  }

  // yield all([
  //   call(requestMenuType, {
  //     type: 'tag',
  //     name: 'menuTags',
  //     action: requestNewTags(),
  //     waitFor: menuTagsFinished,
  //   }),
  //   call(requestMenuType, {
  //     type: 'category',
  //     name: 'menuCategories',
  //     action: requestNewCategories(),
  //     waitFor: menuCategoriesFinished,
  //   }),
  //   call(requestHomeListOnPost),
  // ]);
}

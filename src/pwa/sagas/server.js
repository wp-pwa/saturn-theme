import { call, fork, join, take, put, select, all } from 'redux-saga/effects';
import { dep } from 'worona-deps';

const getSetting = (namespace, setting) =>
  dep('settings', 'selectorCreators', 'getSetting')(namespace, setting);

// Selector creator that gets a list of element ids from menu with a specific type.
const menuTypeIds = type => state =>
  getSetting('theme', 'menu')(state)
    .filter(element => element.type === type)
    .map(element => element[type]);

const requestNewTags = () => dep('connection', 'actions', 'newTagsListRequested');
const requestNewCategories = () => dep('connection', 'actions', 'newCategoriesListRequested');

const menuTagsFinished = action =>
  action.name === 'menuTags' &&
  (action.type === dep('connection', 'types', 'NEW_TAGS_LIST_SUCCEED') ||
    action.type === dep('connection', 'types', 'NEW_TAGS_LIST_FAILED'));

const menuCategoriesFinished = action =>
  action.name === 'menuCategories' &&
  (action.type === dep('connection', 'types', 'NEW_CATEGORIES_LIST_SUCCEED') ||
    action.type === dep('connection', 'types', 'NEW_CATEGORIES_LIST_FAILED'));

function* requestMenuType({ action, type, name, waitFor }) {
  const typeIds = yield select(menuTypeIds(type));
  if (typeIds.length === 0) return; // If the list is empty, it does nothing.

  const waitTask = yield fork(function* wait() {
    yield take(waitFor);
  });
  yield put(action({ name, params: { _embed: true, include: typeIds } }));
  yield join(waitTask);
}

function* requestHomeListOnPost() {
  const requestNewPostList = dep('connection', 'actions', 'newPostsListRequested');
  const isPost = (yield select(dep('router', 'selectors', 'getType'))) === 'post';

  if (isPost) {
    yield put(requestNewPostList());

    yield take(
      ({ type, name }) =>
        (type === dep('connection', 'types', 'NEW_POSTS_LIST_SUCCEED') ||
          type === dep('connection', 'types', 'NEW_POSTS_LIST_FAILED')) &&
        name === 'currentList',
    );
  }
}

export default function* saturnServerSaga() {
  yield take(dep('build', 'types', 'SERVER_SAGAS_INITIALIZED'));

  yield all([
    // call(requestMenuType, {
    //   type: 'tag',
    //   name: 'menuTags',
    //   action: requestNewTags(),
    //   waitFor: menuTagsFinished,
    // }),
    // call(requestMenuType, {
    //   type: 'category',
    //   name: 'menuCategories',
    //   action: requestNewCategories(),
    //   waitFor: menuCategoriesFinished,
    // }),
    // call(requestHomeListOnPost),
  ]);
}

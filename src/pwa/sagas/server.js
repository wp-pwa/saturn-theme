import { fork, join, take, put, select } from 'redux-saga/effects';
import { dep } from 'worona-deps';

const getSetting = (...params) => dep('settings', 'selectorCreators', 'getSetting')(...params);
const menuTypeIds = type => state =>
  getSetting('theme', 'menu')(state)
    .filter(element => element.type === type)
    .map(element => element[type]);

const actionNewTags = () => dep('connection', 'actions', 'newTagsListRequested');
const actionNewCategories = () => dep('connection', 'actions', 'newCategoriesListRequested');

const menuTagsFinished = action =>
  action.name === 'menuTags' &&
  (action.type === dep('connection', 'types', 'NEW_TAGS_LIST_SUCCEED') ||
    action.type === dep('connection', 'types', 'NEW_TAGS_LIST_FAILED'));

const menuCategoriesFinished = action =>
  action.name === 'menuCategories' &&
  (action.type === dep('connection', 'types', 'NEW_CATEGORIES_LIST_SUCCEED') ||
    action.type === dep('connection', 'types', 'NEW_CATEGORIES_LIST_FAILED'));

function* waitForMenuTags() {
  yield take(menuTagsFinished);
}
function* waitForMenuCategories() {
  yield take(menuCategoriesFinished);
}

function* requestMenuType({ action, type, name, waitForMenuType }) {
  const typeIds = yield select(menuTypeIds(type));
  if (typeIds.length === 0) return;

  const task = yield fork(waitForMenuType);
  yield put(action({ name, params: { _embed: true, include: typeIds } }));
  yield join(task);
}

export default function* saturnServerSaga() {
  yield take(dep('build', 'types', 'SERVER_SAGAS_INITIALIZED'));

  const taskTags = yield fork(
    requestMenuType,
    {
      action: actionNewTags(),
      type: 'tag',
      name: 'menuTags',
      waitForMenuType: waitForMenuTags
    },
  );

  const taskCategories = yield fork(
    requestMenuType,
    {
      action: actionNewCategories(),
      type: 'category',
      name: 'menuCategories',
      waitForMenuType: waitForMenuCategories
    },
  );

  yield join(taskTags, taskCategories);
}

import { dep } from 'worona-deps';

export const selectorCreators = {
  get getSetting() {
    return dep('settings', 'selectorCreators', 'getSetting');
  },
  get getListResults() {
    return dep('connection', 'selectorCreators', 'getListResults');
  },
  get isListLoading() {
    return dep('connection', 'selectorCreators', 'isListLoading');
  },
  get isListReady() {
    return dep('connection', 'selectorCreators', 'isListReady');
  },
  get isMediaReady() {
    return dep('connection', 'selectorCreators', 'isMediaReady');
  },
  get getWpTypeById() {
    return dep('connection', 'selectorCreators', 'getWpTypeById');
  },
};

export const selectors = {
  get getURLQueries() {
    return dep('router', 'selectors', 'getURLQueries');
  },
  get getCategoriesEntities() {
    return dep('connection', 'selectors', 'getCategoriesEntities');
  },
  get getPostsEntities() {
    return dep('connection', 'selectors', 'getPostsEntities');
  },
  get getPagesEntities() {
    return dep('connection', 'selectors', 'getPagesEntities');
  },
  get getMediaEntities() {
    return dep('connection', 'selectors', 'getMediaEntities');
  },
  get getUsersEntities() {
    return dep('connection', 'selectors', 'getUsersEntities');
  },
  get getTagsEntities() {
    return dep('connection', 'selectors', 'getTagsEntities');
  },
  get getCurrentSingle() {
    return dep('connection', 'selectors', 'getCurrentSingle');
  },
  get isCurrentSingleReady() {
    return dep('connection', 'selectors', 'isCurrentSingleReady');
  },
  get getHistoryLength() {
    return dep('router', 'selectors', 'getHistoryLength');
  },
};

export const actions = {
  get newCategoriesListRequested() {
    return dep('connection', 'actions', 'newCategoriesListRequested');
  },
  get anotherPostsPageRequested() {
    return dep('connection', 'actions', 'anotherPostsPageRequested');
  },
};

export const libs = {
  get goBack() {
    return dep('router', 'libs', 'goBack');
  },
  get push() {
    return dep('router', 'libs', 'push');
  },
};

export const types = {
  get ANOTHER_POSTS_PAGE_SUCCEED() {
    return dep('connection', 'types', 'ANOTHER_POSTS_PAGE_SUCCEED');
  },
  get ANOTHER_POSTS_PAGE_FAILED() {
    return dep('connection', 'types', 'ANOTHER_POSTS_PAGE_FAILED');
  },
};

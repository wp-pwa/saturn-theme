import { dep } from 'worona-deps';

export const selectorCreators = {
  get getListResults() {
    return dep('connection', 'selectorCreators', 'getListResults');
  },
  get isListReady() {
    return dep('connection', 'selectorCreators', 'isListReady');
  },
  get isMediaReady() {
    return dep('connection', 'selectorCreators', 'isMediaReady');
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
  get getMediaEntities() {
    return dep('connection', 'selectors', 'getMediaEntities');
  },
  get getUsersEntities() {
    return dep('connection', 'selectors', 'getUsersEntities');
  },
};

export const actions = {
  get newCategoriesListRequested() {
    return dep('connection', 'actions', 'newCategoriesListRequested');
  },
};

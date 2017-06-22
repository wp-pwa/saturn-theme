import { dep } from 'worona-deps';

export const selectorCreators = {
  get getListResults() {
    return dep('connection', 'selectorCreators', 'getListResults');
  },
};

export const selectors = {
  get getURLQueries() {
    return dep('router', 'selectors', 'getURLQueries');
  },
  get getCategoriesEntities() {
    return dep('connection', 'selectors', 'getCategoriesEntities');
  },
};

export const actions = {
  get newCategoriesListRequested() {
    return dep('connection', 'actions', 'newCategoriesListRequested');
  },
};

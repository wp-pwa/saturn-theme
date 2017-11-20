import { takeEvery } from 'redux-saga';
import { select, put } from 'redux-saga/effects';
import Wpapi from 'wpapi';
import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import * as deps from '../deps';

export const getCategories = connection =>
  function* getCategoriesSaga({ siteId }) {
    try {
      const categories = yield connection.categories().perPage(100);
      yield put(actions.categoriesListSucceed({ categories, siteId }));
    } catch (error) {
      yield put(actions.categoriesListFailed({ error, siteId }));
    }
  };

export const getPages = connection =>
  function* getPagesSaga({ siteId }) {
    try {
      const pages = yield connection.pages().perPage(100);
      yield put(actions.pagesListSucceed({ pages, siteId }));
    } catch (error) {
      yield put(actions.pagesListFailed({ error, siteId }));
    }
  };

export const getTags = connection =>
  function* getTagsSaga({ siteId }) {
    try {
      const tags = yield connection.tags().perPage(100);
      yield put(actions.tagsListSucceed({ tags, siteId }));
    } catch (error) {
      yield put(actions.tagsListFailed({ error, siteId }));
    }
  };

export default function* wpDataSagas() {
  const { url, id } = yield select(deps.selectors.getSelectedSite);
  const connection = new Wpapi({ endpoint: `https://cors.worona.io/${url}?rest_route=` });
  yield [
    takeEvery(types.CATEGORIES_LIST_REQUESTED, getCategories(connection)),
    takeEvery(types.PAGES_LIST_REQUESTED, getPages(connection)),
    takeEvery(types.TAGS_LIST_REQUESTED, getTags(connection)),
    put(actions.categoriesListRequested({ siteId: id })),
    put(actions.pagesListRequested({ siteId: id })),
    put(actions.tagsListRequested({ siteId: id })),
  ];
}

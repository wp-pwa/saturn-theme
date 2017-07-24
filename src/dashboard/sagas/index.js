import { takeEvery, takeLatest } from 'redux-saga';
import { put, take, select, fork } from 'redux-saga/effects';
import * as deps from '../deps';
import * as types from '../types';
import * as selectors from '../selectors';
import wpDataSagas from './wp-data';

export function* saveDefaults(action) {
  // Check if this site is seleted and wait for it if not. Then wait for the lists to succeed.
  const selectedSiteId = yield select(deps.selectors.getSelectedSiteId);
  if (!selectedSiteId || selectedSiteId !== action.siteId) {
    yield [
      take(({ type, siteId }) => type === deps.types.SITE_SELECTED && siteId === action.siteId),
      take(
        ({ type, siteId }) => type === types.CATEGORIES_LIST_SUCCEED && siteId === action.siteId,
      ),
      take(({ type, siteId }) => type === types.PAGES_LIST_SUCCEED && siteId === action.siteId),
    ];
  } else {
    // If this site is selected and status is different to succeed, wait for lists.
    const status = yield select(selectors.getStatus);
    if (status !== 'succeed') {
      yield [
        take(
          ({ type, siteId }) => type === types.CATEGORIES_LIST_SUCCEED && siteId === action.siteId,
        ),
        take(({ type, siteId }) => type === types.PAGES_LIST_SUCCEED && siteId === action.siteId),
      ];
      // If status is iddle, ask for new lists.
      if (status === 'iddle') yield fork(wpDataSagas);
    }
  }
  // Now that we are sure we have the lists, use them to generate the default settings.
  const categories = yield select(selectors.getCategoriesList);
  const pages = yield select(selectors.getPagesList);
  yield put(
    deps.actions.saveSettingsRequested(
      {
        mainColor: '#00AEEA',
        menu: [
          {
            type: 'blog_home',
            label: 'Home',
            category: (categories[0] && categories[0].id) || 0,
            page: (pages[0] && pages[0].id) || 0,
          },
        ],
      },
      { name: 'saturn-app-theme-worona', siteId: action.siteId },
    ),
  );
}

export default function* saturnThemeSagas() {
  const siteId = yield select(deps.selectors.getSelectedSiteId);
  if (siteId) yield fork(wpDataSagas);
  yield [
    takeEvery(
      action =>
        action.type === deps.types.DEFAULT_SETTINGS_NEEDED &&
        action.name === 'saturn-app-theme-worona',
      saveDefaults,
    ),
    takeLatest(deps.types.SITE_SELECTED, wpDataSagas),
  ];
}

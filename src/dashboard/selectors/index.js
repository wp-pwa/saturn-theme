import { createSelector } from 'reselect';
import * as deps from '../deps';

export const getMenuItemOpen = state => state.saturnTheme.menuItemOpen;
export const getCurrentMenuItems = state => state.saturnTheme.currentMenuItems;
export const getCategoriesList = state => state.saturnTheme.categoriesList;
export const getPagesList = state => state.saturnTheme.pagesList;
export const getThemeSettings = state =>
  deps.selectorCreators.getSettings('saturnTheme')(state);
export const getCategoriesStatus = state => state.saturnTheme.categoriesStatus;
export const getPagesStatus = state => state.saturnTheme.pagesStatus;
export const getStatus = createSelector(
  getCategoriesStatus,
  getPagesStatus,
  (categories, pages) => {
    if (categories === 'error' || pages === 'error') return 'error';
    else if (categories === 'fetching' || pages === 'fetching') return 'fetching';
    else if (categories === 'succeed' && pages === 'succeed') return 'succeed';
    return 'idle';
  }
);

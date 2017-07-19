import { createSelector } from 'reselect';
import * as deps from '../deps';

export const getMenuItemOpen = state => state.starterProTheme.menuItemOpen;
export const getCurrentMenuItems = state => state.starterProTheme.currentMenuItems;
export const getCategoriesList = state => state.starterProTheme.categoriesList;
export const getPagesList = state => state.starterProTheme.pagesList;
export const getThemeSettings = state => deps.selectorCreators.getSettings('saturnTheme')(state);
export const getCategoriesStatus = state => state.starterProTheme.categoriesStatus;
export const getPagesStatus = state => state.starterProTheme.pagesStatus;
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

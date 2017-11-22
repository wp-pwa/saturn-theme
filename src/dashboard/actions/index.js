import * as actionTypes from '../actionTypes';

export const menuItemOpened = ({ index }) => ({ type: types.MENU_ITEM_OPENED, index });
export const menuItemClosed = ({ index }) => ({ type: types.MENU_ITEM_CLOSED, index });
export const menuItemSortStarted = ({ index }) => ({ type: types.MENU_ITEM_SORT_STARTED, index });
export const menuItemSortEnded = ({ oldIndex, newIndex, newMenuItems }) => ({
  type: types.MENU_ITEM_SORT_ENDED,
  oldIndex,
  newIndex,
  newMenuItems,
});
export const menuItemDeleted = ({ index }) => ({ type: types.MENU_ITEM_DELETED, index });
export const menuItemAdded = () => ({ type: types.MENU_ITEM_ADDED });

export const categoriesListRequested = ({ siteId }) => ({
  type: types.CATEGORIES_LIST_REQUESTED,
  siteId,
});
export const categoriesListSucceed = ({ categories, siteId }) => ({
  type: types.CATEGORIES_LIST_SUCCEED,
  categories,
  siteId,
});
export const categoriesListFailed = ({ error, siteId }) => ({
  type: types.CATEGORIES_LIST_FAILED,
  error,
  siteId,
});

export const tagsListRequested = ({ siteId }) => ({
  type: types.TAGS_LIST_REQUESTED,
  siteId,
});
export const tagsListSucceed = ({ tags, siteId }) => ({
  type: types.TAGS_LIST_SUCCEED,
  tags,
  siteId,
});
export const tagsListFailed = ({ error, siteId }) => ({
  type: types.TAGS_LIST_FAILED,
  error,
  siteId,
});

export const pagesListRequested = ({ siteId }) => ({ type: types.PAGES_LIST_REQUESTED, siteId });
export const pagesListSucceed = ({ pages, siteId }) => ({
  type: types.PAGES_LIST_SUCCEED,
  pages,
  siteId,
});
export const pagesListFailed = ({ error, siteId }) => ({
  type: types.PAGES_LIST_FAILED,
  error,
  siteId,
});

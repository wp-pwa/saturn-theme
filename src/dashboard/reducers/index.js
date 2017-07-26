import { combineReducers } from 'redux';
import * as types from '../types';
import * as deps from '../deps';

export const menuItemOpen = (state = false, { type, index, oldIndex, newIndex }) => {
  switch (type) {
    case types.MENU_ITEM_OPENED:
      return index;
    case types.MENU_ITEM_CLOSED:
    case 'redux-form/ARRAY_REMOVE':
    case deps.types.SITE_UNSELECTED:
      return false;
    case types.MENU_ITEM_SORT_ENDED:
      if (oldIndex === state) return newIndex;
      if (state !== false && oldIndex <= state && newIndex >= state) return state - 1;
      if (state !== false && oldIndex > state && newIndex <= state) return state + 1;
      return state;
    default:
      return state;
  }
};

export const categoriesList = (state = [], action) => {
  if (action.type === types.CATEGORIES_LIST_SUCCEED) {
    return action.categories;
  } else if (action.type === deps.types.SITE_UNSELECTED) {
    return [];
  }
  return state;
};

export const pagesList = (state = [], action) => {
  if (action.type === types.PAGES_LIST_SUCCEED) {
    return action.pages;
  } else if (action.type === deps.types.SITE_UNSELECTED) {
    return [];
  }
  return state;
};

export const tagsList = (state = [], action) => {
  if (action.type === types.TAGS_LIST_SUCCEED) {
    return action.tags;
  } else if (action.type === deps.types.SITE_UNSELECTED) {
    return [];
  }
  return state;
};

export const categoriesStatus = (state = 'idle', action) => {
  switch (action.type) {
    case types.CATEGORIES_LIST_REQUESTED:
      return 'fetching';
    case types.CATEGORIES_LIST_SUCCEED:
      return 'succeed';
    case types.CATEGORIES_LIST_FAILED:
      return 'error';
    case deps.types.SITE_UNSELECTED:
      return 'idle';
    default:
      return state;
  }
};

export const pagesStatus = (state = 'idle', action) => {
  switch (action.type) {
    case types.PAGES_LIST_REQUESTED:
      return 'fetching';
    case types.PAGES_LIST_SUCCEED:
      return 'succeed';
    case types.PAGES_LIST_FAILED:
      return 'error';
    case deps.types.SITE_UNSELECTED:
      return 'idle';
    default:
      return state;
  }
};

export const tagsStatus = (state = 'idle', action) => {
  switch (action.type) {
    case types.TAGS_LIST_REQUESTED:
      return 'fetching';
    case types.TAGS_LIST_SUCCEED:
      return 'succeed';
    case types.TAGS_LIST_FAILED:
      return 'error';
    case deps.types.SITE_UNSELECTED:
      return 'idle';
    default:
      return state;
  }
};

export default () =>
  combineReducers({ menuItemOpen,
    categoriesList,
    tagsList,
    pagesList,
    categoriesStatus,
    tagsStatus,
    pagesStatus,
  });

/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getLists = createSelector(
  state => state,
  state =>
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state)
      .filter(({ type }) => ['latest', 'category', 'tag', 'author'].includes(type))
      .map(list => ({
        id: parseInt(list[list.type], 10) || 'post',
        type: list.type,
        title: list.label
      }))
);

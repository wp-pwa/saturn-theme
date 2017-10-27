import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getLists = createSelector(
  state => state,
  state =>
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state)
      .filter(({ type }) => ['latest', 'category', 'tag', 'author'].includes(type))
      .map(list => ({ id: parseInt(list[list.type], 10) || 0, type: list.type, title: list.label })),
);

export const getActiveSlide = createSelector(
  getLists,
  dep('router', 'selectors', 'getId'),
  dep('router', 'selectors', 'getType'),
  (lists, id, type) => lists.findIndex(list => list.id === id && list.type === type),
);

export const areListsReady = createSelector(getLists, lists => !!lists.length);

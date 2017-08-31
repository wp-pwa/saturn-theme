import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getActive = createSelector(
  dep('router', 'selectors', 'getType'),
  dep('router', 'selectors', 'getId'),
  dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu'),
  (type, id, list) =>
    type === 'latest'
      ? 0
      : list.reduce((a, b, index) => (b.type === type && b[type] === id.toString() ? index : a), -1)
);

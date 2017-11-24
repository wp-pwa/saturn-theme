import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getActive = createSelector(
  state => dep('router', 'selectors', 'getType')(state),
  state => dep('router', 'selectors', 'getId')(state),
  state => dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
  (type, id, list) =>
    type === 'latest'
      ? 0
      : list.reduce(
          (a, b, index) => (b.type === type && b[type] === id.toString() ? index : a),
          -1,
        ),
);

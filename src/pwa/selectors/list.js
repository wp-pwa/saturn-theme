import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getLists = createSelector(
  state => state,
  state =>
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state)
      .filter(({ type }) => ['latest', 'category', 'tag', 'author'].includes(type))
      .map(list => ({
        id: parseInt(list[list.type], 10) || 0,
        type: list.type,
        title: list.label,
      })),
);

export const getActiveSlide = createSelector(
  getLists,
  dep('router', 'selectors', 'getId'),
  dep('router', 'selectors', 'getType'),
  (lists, id, type) => lists.findIndex(list => list.id === id && list.type === type),
);

export const areListsReady = createSelector(getLists, lists => !!lists.length);

export const getCarouselLists = createSelector(
  getLists,
  state => state.connection.names.currentList.params,
  (lists, current) => {
    let results = lists.concat(lists.slice(0, 2));

    if (current.categories) {
      const startIndex =
        results.findIndex(item => item.type === 'category' && item.id === current.categories) + 1;
      results = results.slice(startIndex, startIndex + 2);
    } else if (current.tags) {
      const startIndex =
        results.findIndex(item => item.type === 'tag' && item.id === current.tags) + 1;
      results = results.slice(startIndex, startIndex + 2);
    } else if (current.authors) {
      // Not sure if this is working, as we don't support author lists so far.
      const startIndex =
        results.findIndex(item => item.type === 'author' && item.id === current.authors) + 1;
      results = results.slice(startIndex, startIndex + 2);
    } else results = results.slice(1, 3);

    return results;
  },
);

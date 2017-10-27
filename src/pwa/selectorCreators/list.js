import { dep } from 'worona-deps';
import * as selectors from '../selectors';

export const getList = ({ listName, currentPost, nextOnly }) => state => {
  const list = dep('connection', 'selectorCreators', 'getListResults')(listName)(state);

  if (!list) return [];

  if (nextOnly) return list.slice(list.indexOf(currentPost) + 1);

  return list.filter(id => id !== currentPost);
};

export const isListReady = options => state => !!getList(options)(state).length;

export const areSameList = (list1, list2) => state => {
  const names = state.connection.names;

  return (
    list1 !== list2 && (names[list1] && names[list1].key) === (names[list2] && names[list2].key)
  );
};

export const getCarouselLists = id => state => {
  const lists = selectors.list.getLists(state);
  const current = state.connection.names.currentList.params; // Look here for categoris/etc. values so I can now where i am.

  return lists;
};

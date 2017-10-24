import { dep } from 'worona-deps';

export const getList = ({ listName, currentPost, nextOnly }) => state => {
  const list = dep('connection', 'selectorCreators', 'getListResults')(listName)(state);

  if (!list) return [];

  if (nextOnly) return list.slice(list.indexOf(currentPost) + 1);

  return list.filter(id => id !== currentPost);
};

export const isListReady = options => state => !!getList(options)(state).length;

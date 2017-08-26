import { dep } from 'worona-deps';

export const getTitle = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).title.rendered;

export const getMedia = id => state =>
  dep('connection', 'selectorCreators', 'getPostById')(id)(state).featured_media;

export const getAuthor = id => state => {
  const authorId = dep('connection', 'selectorCreators', 'getPostById')(id)(state).author;
  return dep('connection', 'selectorCreators', 'getUserById')(authorId)(state).name;
};

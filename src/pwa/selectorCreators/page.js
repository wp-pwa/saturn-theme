import { dep } from 'worona-deps';

export const getTitle = id => state => {
  const page = dep('connection', 'selectorCreators', 'getPageById')(id)(state);
  return (page && page.title.rendered) || '';
};

export const getContent = id => state => {
  const page = dep('connection', 'selectorCreators', 'getPageById')(id)(state);
  return (page && page.content.rendered) || '';
};

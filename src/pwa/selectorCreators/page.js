import { dep } from 'worona-deps';

export const getContent = id => state =>
  dep('connection', 'selectorCreators', 'getPageById')(id)(state).content.rendered;

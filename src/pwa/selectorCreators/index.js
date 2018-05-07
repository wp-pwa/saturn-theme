import { dep } from 'worona-deps';
import * as share from './share';
import * as post from './post';
import * as page from './page';
import * as media from './media';
import * as slots from './slots';

const getListType = name => state => {
  const params = dep('connection', 'selectorCreators', 'getListParams')(name)(state);
  if (params.categories) return 'category';
  else if (params.tags) return 'tag';
  else if (params.author) return 'author';
  else if (params.search) return 'search';
  return 'latest';
};

const getListId = name => state => {
  const params = dep('connection', 'selectorCreators', 'getListParams')(name)(state);
  if (params.categories) return params.categories;
  else if (params.tags) return params.tags;
  else if (params.author) return params.author;
  else if (params.search) return params.search;
  return 0;
};

export { getListType, getListId, share, post, page, media, slots };

import { dep } from 'worona-deps';
import * as shareModal from './shareModal';

export const getListType = name => state => {
  const params = dep('connection', 'selectorCreators', 'getListParams')(name)(state);
  if (params.categories) return 'category';
  else if (params.tags) return 'tag';
  else if (params.author) return 'author';
  else if (params.search) return 'search';
  return 'latest';
}

export const getListId = name => state => {
  const params = dep('connection', 'selectorCreators', 'getListParams')(name)(state);
  if (params.categories) return params.categories;
  else if (params.tags) return params.tags;
  else if (params.author) return params.author;
  else if (params.search) return params.search;
  return 0;
}


module.exports.shareModal = shareModal;

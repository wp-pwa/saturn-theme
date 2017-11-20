import { combineReducers } from 'redux';
import { dep } from 'worona-deps';

const ROUTE_CHANGE_SUCCEED = dep('router', 'types', 'ROUTE_CHANGE_SUCCEED');

const firstId = (state = false, { type, ...action }) => {
  if (type === 'connection/NEW_POSTS_LIST_REQUESTED' && state !== null && action.name === 'currentList')
    return null;

  if (type === ROUTE_CHANGE_SUCCEED && state !== null) {
    const { query } = action;
    if (state === false && query && query.p) return query.p;
    if (query && typeof query.p === 'undefined') return null;
  }

  return state;
};

export default () => combineReducers({
  firstId,
});

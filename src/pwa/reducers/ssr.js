import { combineReducers } from 'redux';
import { dep } from 'worona-deps';

const ROUTE_CHANGE_SUCCEED = dep('router', 'types', 'ROUTE_CHANGE_SUCCEED');

const firstId = (state = false, { type, query }) => {
  if (type === ROUTE_CHANGE_SUCCEED && state !== null) {
    if (state === false && query && query.p) return query.p;
    if (query && typeof query.p === 'undefined') return null;
  }

  return state;
};

export default combineReducers({
  firstId,
});

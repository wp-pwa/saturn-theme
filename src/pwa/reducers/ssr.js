import { combineReducers } from 'redux';
import { dep } from 'worona-deps';

const firstId = (state = false, { type, query }) => {
  const ROUTE_CHANGE_SUCCEED = dep('connection', 'types', 'ROUTE_CHANGE_SUCCEED');
  if (type === ROUTE_CHANGE_SUCCEED && state !== null) {
    if (state === false && query && query.p) return query.p;
    if (query && typeof query.p === 'undefined') return null;
  }

  return state;
};

export default () => combineReducers({
  firstId,
});

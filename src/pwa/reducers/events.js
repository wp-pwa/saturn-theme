import { combineReducers } from 'redux';
import { dep } from 'worona-deps';

const ROUTE_CHANGE_REQUESTED = dep('connection', 'actionTypes', 'ROUTE_CHANGE_REQUESTED');

const swipeCounter = (state = 0, action) => {
  switch (action.type) {
    case ROUTE_CHANGE_REQUESTED:
      if (action.event && action.event.category === 'Swipe') {
        return state + 1;
      }

      return state;
    default:
      return state;
  }
};

const infiniteScrollCounter = (state = 0, action) => {
  switch (action.type) {
    case ROUTE_CHANGE_REQUESTED:
    default:
      return state;
  }
};

export default () =>
  combineReducers({
    swipeCounter,
    infiniteScrollCounter,
  });

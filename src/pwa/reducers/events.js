import { combineReducers } from 'redux';
import { dep } from 'worona-deps';

const swipeCounter = (
  state = {
    Post: 0,
    List: 0,
    Media: 0,
  },
  action,
) => {
  switch (action.type) {
    case dep('connection', 'actionTypes', 'ROUTE_CHANGE_REQUESTED'):
      if (action.event && action.event.action === 'swipe') {
        state[action.event.category] = action.event.value;
      }

      return state;
    default:
      return state;
  }
};

const infiniteScrollCounter = (state = 0, action) => {
  switch (action.type) {
    case dep('connection', 'actionTypes', 'ROUTE_CHANGE_REQUESTED'):
      if (action.event && action.event.category === 'Infinite Scroll') {
        return action.event.value;
      }

      return state;
    default:
      return state;
  }
};

export default () =>
  combineReducers({
    swipeCounter,
    infiniteScrollCounter,
  });

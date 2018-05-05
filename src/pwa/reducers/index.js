import { combineReducers } from 'redux';
import share from './share';
import notifications from './notifications';
import scroll from './scroll';
import sticky from './sticky';

export default () =>
  combineReducers({
    share,
    notifications,
    scroll,
    sticky,
  });

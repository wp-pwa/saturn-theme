import { combineReducers } from 'redux';
import share from './share';
import comments from './comments';
import cookies from './cookies';
import notifications from './notifications';
import scroll from './scroll';
import sticky from './sticky';

export default () =>
  combineReducers({
    share,
    comments,
    cookies,
    notifications,
    scroll,
    sticky,
  });

import { combineReducers } from 'redux';
import share from './share';
import comments from './comments';
import notifications from './notifications';
import scroll from './scroll';
import sticky from './sticky';

export default () =>
  combineReducers({
    share,
    comments,
    notifications,
    scroll,
    sticky,
  });

import { combineReducers } from 'redux';
import share from './share';
import comments from './comments';
import menu from './menu';
import ssr from './ssr';
import cookies from './cookies';
import notifications from './notifications';
import scroll from './scroll';
import sticky from './sticky';
import events from './events';

export default () =>
  combineReducers({
    menu,
    share,
    comments,
    ssr: ssr(),
    cookies,
    notifications,
    scroll,
    sticky,
    events: events(),
  });

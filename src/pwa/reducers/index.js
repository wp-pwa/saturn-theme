import { combineReducers } from 'redux';
import share from './share';
import scroll from './scroll';
import sticky from './sticky';

export default () =>
  combineReducers({
    share,
    scroll,
    sticky,
  });

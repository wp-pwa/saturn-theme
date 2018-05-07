import { combineReducers } from 'redux';
import share from './share';
import scroll from './scroll';

export default () =>
  combineReducers({
    share,
    scroll,
  });

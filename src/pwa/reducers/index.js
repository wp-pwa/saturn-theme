import { combineReducers } from 'redux';
import shareModal from './shareModal';
import comments from './comments';
import postSlider from './postSlider';
import menu from './menu';
import nav from './nav';
// import cookies from './cookies';

export default combineReducers({
  nav,
  menu,
  postSlider,
  shareModal,
  comments
  // cookies,
});

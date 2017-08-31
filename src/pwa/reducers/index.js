import { combineReducers } from 'redux';
import shareModal from './shareModal';
import comments from './comments';
import postSlider from './postSlider';
import menu from './menu';
// import cookies from './cookies';

export default combineReducers({
  menu,
  postSlider,
  shareModal,
  comments
  // cookies,
});

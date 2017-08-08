import { combineReducers } from 'redux';
import shareModal from './shareModal';
import comments from './comments';
import postSlider from './postSlider';
import menu from './menu';

export default () =>
  combineReducers({
    menu,
    shareModal,
    comments,
    postSlider,
  });

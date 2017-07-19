import { combineReducers } from 'redux';
import shareModal from './shareModal';
import comments from './comments';
import postSlider from './postSlider';
import listSlider from './listSlider';

export default () =>
  combineReducers({
    shareModal,
    comments,
    postSlider,
    listSlider,
  });

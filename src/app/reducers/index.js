import { combineReducers } from 'redux';
import shareModal from './shareModal';
import comments from './comments';
import postSlider from './postSlider';

export default () =>
  combineReducers({
    shareModal,
    comments,
    postSlider,
  });

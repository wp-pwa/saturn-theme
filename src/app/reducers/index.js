import { combineReducers } from 'redux';
import shareModal from './shareModal';
import comments from './comments';
import swipePosts from './swipePosts';

export default () =>
  combineReducers({
    shareModal,
    comments,
    swipePosts,
  });

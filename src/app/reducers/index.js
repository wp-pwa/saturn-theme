import { combineReducers } from 'redux';
import shareModal from './shareModal';
import comments from './comments';


export default () =>
  combineReducers({
    shareModal,
    comments,
  });

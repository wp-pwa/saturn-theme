import { combineReducers } from 'redux';
import shareModal from './shareModal';
import comments from './comments';
import postSlider from './postSlider';
import menu from './menu';
import ssr from './ssr';
import cookies from './cookies';
import notifications from './notifications';

export default () => combineReducers({
  menu,
  postSlider,
  shareModal,
  comments,
  ssr: ssr(),
  cookies,
  notifications,
});

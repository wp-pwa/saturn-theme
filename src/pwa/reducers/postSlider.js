import { combineReducers } from 'redux';
import * as types from '../types';

const hiddenBars = (state = false, action) => {
  switch (action.type) {
    case types.BARS_HAVE_HIDDEN:
      return true;
    case types.BARS_HAVE_SHOWN:
      return false;
    default:
      return state;
  }
};

const postSlider = combineReducers({ hiddenBars });

export default postSlider;

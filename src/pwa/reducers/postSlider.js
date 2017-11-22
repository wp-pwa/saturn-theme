import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes';

const hiddenBars = (state = false, action) => {
  switch (action.type) {
    case actionTypes.BARS_HAVE_HIDDEN:
      return true;
    case actionTypes.BARS_HAVE_SHOWN:
      return false;
    default:
      return state;
  }
};

const postSlider = combineReducers({ hiddenBars });

export default postSlider;

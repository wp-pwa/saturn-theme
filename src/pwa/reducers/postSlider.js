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

const sliderDirection = (state = null, action) => {
  switch (action.type) {
    case types.ACTIVE_POST_SLIDE_CHANGE_STARTED:
      return action.direction;
    default:
      return state;
  }
};

const postSlider = combineReducers({ sliderDirection, hiddenBars });

export default postSlider;

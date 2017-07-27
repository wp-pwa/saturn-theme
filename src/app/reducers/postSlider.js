import { combineReducers } from 'redux';
import { ACTIVE_POST_SLIDE_HAS_CHANGED, SAVE_TEMP_POST_SLIDER_STATE, HIDE_BARS, SHOW_BARS } from '../types';

const temp = (state = { activeSlide: 0, latestSlide: 0 }, action) => {
  switch (action.type) {
    case SAVE_TEMP_POST_SLIDER_STATE:
      return {
        activeSlide: action.activeSlide,
        latestSlide: action.latestSlide,
      };
    default:
      return state;
  }
};

const final = (state = { activeSlide: 0, sliderAnimation: null }, action) => {
  switch (action.type) {
    case ACTIVE_POST_SLIDE_HAS_CHANGED:
      return {
        activeSlide: action.activeSlide,
        sliderAnimation: action.sliderAnimation,
      };
    default:
      return state;
  }
};

const hiddenBars = (state = false, action) => {
  switch (action.type) {
    case HIDE_BARS:
      return true;
    case SHOW_BARS:
      return false;
    default:
      return state;
  }
};

const postSlider = combineReducers({ temp, final, hiddenBars });

export default postSlider;

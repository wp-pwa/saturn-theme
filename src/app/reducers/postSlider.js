import { combineReducers } from 'redux';
import { ACTIVE_POST_SLIDE_CHANGED } from '../types';

const activeSlide = (state = 0, action) => {
  switch (action.type) {
    case ACTIVE_POST_SLIDE_CHANGED:
      return action.activeSlide;
    default:
      return state;
  }
};

const sliderAnimation = (state = null, action) => {
  switch (action.type) {
    case ACTIVE_POST_SLIDE_CHANGED:
      return action.sliderAnimation;
    default:
      return state;
  }
};

const postSlider = combineReducers({ activeSlide, sliderAnimation });

export default postSlider;

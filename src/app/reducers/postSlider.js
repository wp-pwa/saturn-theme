import { combineReducers } from 'redux';
import { CREATE_POST_SLIDER, CHANGE_ACTIVE_POST_SLIDE } from '../types';

const activeSlide = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_POST_SLIDE:
      return action.activeSlide;
    default:
      return state;
  }
};

const sliderLength = (state = 0, action) => {
  switch (action.type) {
    case CREATE_POST_SLIDER:
      return action.sliderLength;
    default:
      return state;
  }
};

const postSlider = combineReducers({ sliderLength, activeSlide });

export default postSlider;

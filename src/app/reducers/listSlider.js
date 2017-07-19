import { combineReducers } from 'redux';
import { CREATE_LIST_SLIDER, CHANGE_ACTIVE_LIST_SLIDE } from '../types';

const activeSlide = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_LIST_SLIDE:
      return action.activeSlide;
    default:
      return state;
  }
};

const sliderLength = (state = 0, action) => {
  switch (action.type) {
    case CREATE_LIST_SLIDER:
      return action.sliderLength;
    default:
      return state;
  }
};

const listSlider = combineReducers({ sliderLength, activeSlide });

export default listSlider;

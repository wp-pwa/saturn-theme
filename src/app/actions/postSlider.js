import { CREATE_POST_SLIDER, ACTIVE_POST_SLIDE_CHANGED } from '../types';

export const createPostSlider = sliderLength => ({
  type: CREATE_POST_SLIDER,
  sliderLength,
});

export const activePostSlideChanged = (activeSlide, sliderAnimation) => ({
  type: ACTIVE_POST_SLIDE_CHANGED,
  activeSlide,
  sliderAnimation,
});

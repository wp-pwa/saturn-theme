import { CREATE_POST_SLIDER, CHANGE_ACTIVE_POST_SLIDE } from '../types';

export const createPostSlider = (sliderLength) => ({
  type: CREATE_POST_SLIDER,
  sliderLength,
});

export const changeActivePostSlide = activeSlide => ({
  type: CHANGE_ACTIVE_POST_SLIDE,
  activeSlide,
});

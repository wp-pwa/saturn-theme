import { ACTIVE_POST_SLIDE_CHANGED } from '../types';

export const activePostSlideChanged = ({ activeSlide, sliderAnimation, sliderLength }) => ({
  type: ACTIVE_POST_SLIDE_CHANGED,
  activeSlide,
  sliderAnimation,
  sliderLength,
});

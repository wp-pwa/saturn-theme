import { ACTIVE_POST_SLIDE_HAS_CHANGED, SAVE_TEMP_POST_SLIDER_STATE } from '../types';

export const activePostSlideHasChanged = ({
  activeSlide,
  sliderAnimation,
  sliderLength,
}) => ({
  type: ACTIVE_POST_SLIDE_HAS_CHANGED,
  activeSlide,
  sliderAnimation,
  sliderLength,
});

export const saveTempPostSliderState = ({ activeSlide, latestSlide }) => ({
  type: SAVE_TEMP_POST_SLIDER_STATE,
  activeSlide,
  latestSlide,
});

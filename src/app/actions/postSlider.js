import {
  ACTIVE_POST_SLIDE_HAS_CHANGED,
  SAVE_TEMP_POST_SLIDER_STATE,
  POST_HAS_SCROLLED,
  HIDE_BARS,
  SHOW_BARS,
} from '../types';

export const activePostSlideHasChanged = ({ activeSlide, sliderAnimation, sliderLength }) => ({
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

export const postHasScrolled = ({ direction }) => ({
  type: POST_HAS_SCROLLED,
  direction,
});

export const hideBars = () => ({
  type: HIDE_BARS,
});

export const showBars = () => ({
  type: SHOW_BARS,
});

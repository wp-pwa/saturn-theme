import {
  ACTIVE_POST_SLIDE_CHANGE_REQUESTED,
  ACTIVE_POST_SLIDE_CHANGE_STARTED,
  ACTIVE_POST_SLIDE_CHANGE_FINISHED,
  POST_HAS_SCROLLED,
  BARS_HAVE_HIDDEN,
  BARS_HAVE_SHOWN,
} from '../types';

export const activePostSlideChangeRequested = ({ activeSlide, sliderAnimation, sliderLength }) => ({
  type: ACTIVE_POST_SLIDE_CHANGE_REQUESTED,
  activeSlide,
  sliderAnimation,
  sliderLength,
});

export const activePostSlideChangeStarted = ({ activeSlide }) => ({
  type: ACTIVE_POST_SLIDE_CHANGE_STARTED,
  activeSlide,
});

export const activePostSlideChangeFinished = ({ activeSlide, sliderAnimation, sliderLength }) => ({
  type: ACTIVE_POST_SLIDE_CHANGE_FINISHED,
  activeSlide,
  sliderAnimation,
  sliderLength,
});

export const postHasScrolled = ({ direction }) => ({
  type: POST_HAS_SCROLLED,
  direction,
});

export const barsHaveHidden = () => ({
  type: BARS_HAVE_HIDDEN,
});

export const barsHaveShown = () => ({
  type: BARS_HAVE_SHOWN,
});

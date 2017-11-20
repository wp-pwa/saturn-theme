/* eslint-disable import/prefer-default-export */
import * as actionTypes from '../actionTypes';

export const activeSlideHasChanged = ({ id, wpType }) => ({
  type: actionTypes.ACTIVE_LIST_SLIDE_HAS_CHANGED,
  id,
  wpType,
});

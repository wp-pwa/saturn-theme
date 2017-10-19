import * as types from '../types';

export const activeSlideHasChanged = ({ id, wpType }) => ({
  type: types.ACTIVE_LIST_SLIDE_HAS_CHANGED,
  id,
  wpType,
});

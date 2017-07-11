import * as types from '../types';

export const openShareModal = ({ id, wpType }) => ({
  type: types.SHARE_MODAL_OPENED,
  id,
  wpType,
});
export const closeShareModal = () => ({ type: types.SHARE_MODAL_CLOSED });

import * as types from '../types';

export const openShareModal = ({ id, wpType }) => ({
  type: types.SHARE_MODAL_OPENED,
  id,
  wpType,
});
export const closeShareModal = () => ({ type: types.SHARE_MODAL_CLOSED });
export const requestShareCount = ({ id, wpType }) => ({
  type: types.ALL_SHARE_COUNT_REQUESTED,
  id,
  wpType,
});
export const shareCountSucceed = ({ id, network, value }) => ({
  type: types.SHARE_COUNT_SUCCEED,
  id,
  network,
  value,
});
export const shareCountFailed = ({ id }) => ({ type: types.SHARE_COUNT_FAILED, id });
export const allShareCountSucceed = ({ id }) => ({ type: types.ALL_SHARE_COUNT_SUCCEED, id });
export const setLinkCopied = ({ value }) => ({ type: types.LINK_COPIED, value });

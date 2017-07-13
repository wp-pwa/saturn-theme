import * as types from '../types';

export const open = ({ id, wpType }) => ({
  type: types.SHARE_MODAL_OPENED,
  id,
  wpType,
});
export const close = () => ({ type: types.SHARE_MODAL_CLOSED });
export const requestCount = ({ id, wpType }) => ({
  type: types.ALL_SHARE_COUNT_REQUESTED,
  id,
  wpType,
});
export const countSucceed = ({ id, network, value }) => ({
  type: types.SHARE_COUNT_SUCCEED,
  id,
  network,
  value,
});
export const countFailed = ({ id }) => ({ type: types.SHARE_COUNT_FAILED, id });
export const allCountSucceed = ({ id }) => ({ type: types.ALL_SHARE_COUNT_SUCCEED, id });
export const setLinkCopied = ({ value }) => ({ type: types.LINK_COPIED, value });

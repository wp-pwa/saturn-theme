import { createSelector } from 'reselect';
import * as selectorCreators from '../selectorCreators';
import * as deps from '../deps';

export const getShareModalOpen = state => state.theme.shareModal.isOpen;
export const getShareModalWpType = state => state.theme.shareModal.wpType;
export const getShareModalId = state => state.theme.shareModal.id;

export const getEntityToShare = createSelector(
  state => state,
  getShareModalWpType,
  getShareModalId,
  (state, wpType, id) => deps.selectorCreators.getWpTypeById(wpType, id)(state)
);

export const areCurrentCountsReady = createSelector(
  state => state,
  getShareModalId,
  (state, id) => selectorCreators.areCountsReady(id)(state)
);

export const getCurrentTotalShares = createSelector(
  state => state,
  getShareModalId,
  areCurrentCountsReady,
  (state, id, countsReady) => (countsReady ? selectorCreators.getTotalShares(id)(state) : NaN)
);

import { createSelector } from 'reselect';
import * as selectorCreators from '../selectorCreators';

export const isOpen = state => state.theme.share.isOpen;
export const getId = state => state.theme.share.id;
export const getWpType = state => state.theme.share.wpType;

export const areCurrentCountsReady = createSelector(state => state, getId, (state, id) =>
  selectorCreators.share.areCountsReady(id)(state),
);

export const getCurrentCounts = createSelector(
  state => state,
  getId,
  areCurrentCountsReady,
  (state, id, countsReady) => (countsReady ? state.theme.share.entities.counts[id] : {}),
);

export const getCurrentTotalCounts = createSelector(
  state => state,
  getId,
  areCurrentCountsReady,
  (state, id, countsReady) => (countsReady ? selectorCreators.share.getTotalCounts(id)(state) : 0),
);

export const isLinkCopied = state => state.theme.share.linkCopied;

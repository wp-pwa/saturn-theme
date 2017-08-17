import { createSelector } from 'reselect';
import { dep } from 'worona-deps';
import * as selectorCreators from '../selectorCreators';

export const isOpen = state => state.theme.shareModal.isOpen;
export const getId = state => state.theme.shareModal.id;
export const getWpType = state => state.theme.shareModal.wpType;

export const getEntity = createSelector(
  state => state,
  getWpType,
  getId,
  (state, wpType, id) => dep('connection', 'selectorCreators', 'getWpTypeById')(wpType, id)(state)
);

export const areCurrentCountsReady = createSelector(
  state => state,
  getId,
  (state, id) => selectorCreators.shareModal.areCountsReady(id)(state)
);

export const getCurrentCounts = createSelector(
  state => state,
  getId,
  areCurrentCountsReady,
  (state, id, countsReady) => (countsReady ? state.theme.shareModal.entities.counts[id] : {})
);

export const getCurrentTotalCounts = createSelector(
  state => state,
  getId,
  areCurrentCountsReady,
  (state, id, countsReady) =>
    (countsReady ? selectorCreators.shareModal.getTotalCounts(id)(state) : NaN)
);

export const isLinkCopied = state => state.theme.shareModal.linkCopied;

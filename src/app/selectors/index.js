import { createSelector } from 'reselect';

import * as deps from '../deps';
import * as selectorCreators from '../selectorCreators';

import * as shareModal from './shareModal';
import * as comments from './comments';

export const getTotalShares = createSelector(
  state => state,
  state => deps.selectors.isCurrentSingleReady(state),
  state => deps.selectors.getCurrentSingle(state),
  (state, isReady, current) => (
    isReady && selectorCreators.areCountsReady(current.id)(state)
      ? selectorCreators.getTotalShares(current.id)(state)
      : 0
    )
);

export const isTotalSharesReady = createSelector(
  state => state,
  state => deps.selectors.isCurrentSingleReady(state),
  state => deps.selectors.getCurrentSingle(state),
  (state, isReady, current) => isReady && selectorCreators.areCountsReady(current.id)(state)
);

export { shareModal, comments };

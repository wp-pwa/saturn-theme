export const getTotalShares = id => state =>
  Object.values(state.theme.shareModal.entities.counts[id])
    .map(value => typeof value === 'number' && value)
    .reduce((sum, value) => sum + value, 0);

export const areCountsReady = id => state => !!state.theme.shareModal.entities.isReady[id];

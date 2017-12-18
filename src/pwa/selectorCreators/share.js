export const getTotalCounts = id => state =>
  Object.values(state.theme.share.entities.counts[id] || {}).reduce(
    (sum, value) => sum + value,
    0,
  );

export const areCountsReady = id => state => !!state.theme.share.entities.isReady[id];

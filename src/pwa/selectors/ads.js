import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getConfig = state =>
  dep('settings', 'selectorCreators', 'getSetting')('theme', 'ads')(state);

export const postsBeforeAd = createSelector(
  getConfig,
  config => (config ? config.postsBeforeAd : 0),
);

export const atTheBeginning = createSelector(
  getConfig,
  config => (config ? config.atTheBeginning : false),
);

export const atTheEnd = createSelector(getConfig, config => (config ? config.atTheEnd : false));

export const getList = createSelector(getConfig, config => (config ? config.adList : []));

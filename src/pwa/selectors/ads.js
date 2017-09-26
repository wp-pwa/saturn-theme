import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getConfig = state =>
  dep('settings', 'selectorCreators', 'getSetting')('theme', 'ads')(state);

export const firstAdPosition = createSelector(
  getConfig,
  config => (config && config.firstAdPosition !== undefined ? config.firstAdPosition : 0),
);

export const postsBeforeAd = createSelector(
  getConfig,
  config => (config && config.postsBeforeAd !== undefined ? config.postsBeforeAd : 0),
);

export const atTheBeginning = createSelector(
  getConfig,
  config => (config && config.atTheBeginning !== undefined ? config.atTheBeginning : false),
);

export const atTheEnd = createSelector(getConfig, config => (config ? config.atTheEnd : false));

export const getList = createSelector(getConfig, config => (config ? config.adList : []));

export const getCurrentTarget = createSelector(
  state => dep('connection', 'selectors', 'getEntity')(state),
  entity => entity && (entity['post-target'] || entity['term-target']) || ''
)

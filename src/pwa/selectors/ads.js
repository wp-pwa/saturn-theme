import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getConfig = state =>
  dep('settings', 'selectorCreators', 'getSetting')('theme', 'adsConfig')(state);

export const firstAdPosition = createSelector(
  getConfig,
  config =>
    config.options && config.options.firstAdPosition !== undefined
      ? config.options.firstAdPosition
      : 0,
);

export const postsBeforeAd = createSelector(
  getConfig,
  config =>
    config.options && config.options.postsBeforeAd !== undefined ? config.options.postsBeforeAd : 0,
);

export const atTheBeginning = createSelector(
  getConfig,
  config =>
    config.options && config.options.atTheBeginning !== undefined
      ? config.options.atTheBeginning
      : false,
);

export const atTheEnd = createSelector(
  getConfig,
  config => (config.options ? config.options.atTheEnd : false),
);

export const getList = createSelector(
  getConfig,
  config => (config.formats ? config.formats.default : []),
);

export const doesStickyExist = createSelector(
  getConfig,
  config =>
    config.options.filter(({ options }) => options.sticky && options.sticky.display).length > 0,
);

import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getConfig = state =>
  dep('settings', 'selectorCreators', 'getSetting')('theme', 'adsConfig')(state);

export const doesStickyExist = createSelector(
  getConfig,
  config =>
    !!config &&
    config.formats.filter(({ options }) => options && options.sticky && options.sticky.display)
      .length > 0,
);

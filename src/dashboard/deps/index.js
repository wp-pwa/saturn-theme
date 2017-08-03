import { dep } from 'worona-deps';

export const elements = {
  get Button() { return dep('theme', 'elements', 'Button'); },
  get Icon() { return dep('theme', 'elements', 'Icon'); },
  get Switch() { return dep('theme', 'elements', 'Switch'); },
  get Select() { return dep('theme', 'elements', 'Select'); },
  get RootContainer() { return dep('theme', 'elements', 'RootContainer'); },
};

export const actions = {
  get saveSettingsRequested() { return dep('settings', 'actions', 'saveSettingsRequested'); },
};

export const selectors = {
  get getSelectedSiteId() { return dep('router', 'selectors', 'getSelectedSiteId'); },
  get getSavingSettings() { return dep('settings', 'selectors', 'getSavingSettings'); },
  get getSelectedSite() { return dep('sites', 'selectors', 'getSelectedSite'); },
};

export const selectorCreators = {
  get getSettings() { return dep('settings', 'selectorCreators', 'getSettings'); },
  get getSetting() { return dep('settings', 'selectorCreators', 'getSetting'); },
};

export const types = {
  get DEFAULT_SETTINGS_NEEDED() { return dep('settings', 'types', 'DEFAULT_SETTINGS_NEEDED'); },
  get SITE_SELECTED() { return dep('router', 'types', 'SITE_SELECTED'); },
  get SITE_UNSELECTED() { return dep('router', 'types', 'SITE_UNSELECTED'); },
};

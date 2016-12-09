import { dep } from 'worona-deps';

export const elements = {
  get RootContainer() { return dep('theme', 'elements', 'RootContainer'); },
};

export const actions = {
  get saveSettingsRequested() { return dep('settings', 'actions', 'saveSettingsRequested'); },
};

export const types = {
  get DEFAULT_SETTINGS_NEEDED() { return dep('settings', 'types', 'DEFAULT_SETTINGS_NEEDED'); },
};

import { types } from 'mobx-state-tree';
import * as languages from './languages';

export default types
  .model('Localization')
  .props({
    default: types.optional(types.frozen, languages.en),
    current: types.optional(types.frozen, {}),
  })
  .actions(self => ({
    setLang(lang) {
      self.current = languages[lang] || {};
    },
    getText(key) {
      return self.current[key] || self.default[key];
    },
  }));

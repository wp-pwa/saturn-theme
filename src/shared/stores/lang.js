import { types } from 'mobx-state-tree';
import * as languages from './languages';

export default types
  .model('Localization')
  .props({
    default: types.optional(types.frozen, languages.en),
    current: types.optional(types.frozen, {}),
  })
  .views(self => ({
    get(key) {
      return self.current[key] || self.default[key];
    },
    getReadingTime(time) {
      const text = time === 1 ? self.get('readingTime') : self.get('readingTimePlural');
      return text.replace('#number#', time);
    },
    getShares(count) {
      return count === 1 ? self.get('shares') : self.get('sharesPlural');
    },
    getSharesWithNumber(count) {
      const text = count === 1 ? self.get('sharesWithNumber') : self.get('sharesWithNumberPlural');
      return text.replace('#number#', count);
    },
    getMoreInCategory(category) {
      return self.get('moreInCategory').reclate('#category#', category);
    },
  }))
  .actions(self => ({
    setLang(lang) {
      self.current = languages[lang] || {};
    },
  }));

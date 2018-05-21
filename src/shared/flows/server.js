import { flow } from 'mobx-state-tree';
import { home, single } from '../contexts';

export default self =>
  flow(function* SaturnServerFlow({ selectedItem }) {
    // Set the theme language.
    self.theme.lang.setLang(self.settings.theme.lang);

    // Set first context.
    if (selectedItem.page) {
      const { menu } = self.settings.theme;
      const context = home(menu);
      self.connection.routeChangeSucceed({ selectedItem, context });
      yield self.connection.fetchListPage(selectedItem);
    } else {
      const context = single();
      self.connection.routeChangeSucceed({ selectedItem, context });
      yield self.connection.fetchEntity(selectedItem);
    }
  });

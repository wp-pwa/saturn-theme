/* eslint-disable func-names */
import { flow, getEnv } from 'mobx-state-tree';
import base from '../../shared/stores';
import { home, single } from '../../shared/contexts';

export default base.actions(self => ({
  fetchSelectedItem: flow(function*() {
    const { connection, settings } = self.root;
    const selectedItem = getEnv(self).initialSelectedItem;

    if (selectedItem.page) {
      const { menu } = settings.theme;
      const context = home(menu);
      connection.routeChangeSucceed({
        selectedItem,
        context,
      });
      yield connection.fetchListPage(selectedItem);
    } else {
      const context = single();
      connection.routeChangeSucceed({
        selectedItem,
        context,
      });
      yield connection.fetchEntity(selectedItem);
    }
  }),
  fetchShareCount: flow(function*() {
    const { type, id } = getEnv(self).initialSelectedItem;
    yield self.share.all.requestCount({ type, id });
  }),
  beforeSsr: flow(function*() {
    const { settings } = self.root;
    self.lang.setLang(settings.theme.lang);

    yield self.fetchSelectedItem();
    yield self.fetchShareCount();
  }),
}));

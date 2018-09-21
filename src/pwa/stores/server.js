/* eslint-disable func-names */
import { flow, getEnv } from 'mobx-state-tree';
import base from '../../shared/stores';
import { home, singleWithLatest } from '../../shared/contexts';
import mediumProcs from '../../shared/processors/medium';
import lowProcs from '../../shared/processors/low';

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
      const context = singleWithLatest(selectedItem);
      connection.routeChangeSucceed({
        selectedItem,
        context,
      });
      yield connection.fetchEntity(selectedItem);
    }
  }),
  beforeSsr: flow(function*() {
    const { settings } = self.root;
    self.lang.setLang(settings.theme.lang);

    // Set first context.
    yield self.fetchSelectedItem();

    mediumProcs.forEach(proc => self.h2r.addProcessor(proc, 'medium'));
    lowProcs.forEach(conv => self.h2r.addProcessor(conv, 'low'));
  }),
}));

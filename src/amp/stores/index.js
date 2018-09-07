/* eslint-disable func-names */
import { flow, getEnv } from 'mobx-state-tree';
import base from '../../shared/stores';
import { home, single } from '../../shared/contexts';
import { gaVars, gaTriggers } from '../analytics';
import processors from '../../shared/processors';

export default base.actions(self => ({
  fetchInitialState: flow(function*() {
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
      yield connection.fetchListPage({ type: 'latest', id: 'post', page: 1 });
    }
  }),
  fetchMenuTaxonomies: flow(function*() {
    const { settings, connection } = self.root;

    const menu = settings.theme.menu.reduce((result, current) => {
      if (current.type !== 'link' && current.type !== 'latest') {
        if (result[current.type])
          result[current.type].push(current[current.type]);
        else result[current.type] = [current[current.type]];
      }

      return result;
    }, {});

    if (menu.category) {
      yield connection.fetchCustomPage({
        name: 'menuCategories',
        type: 'category',
        page: 1,
        params: { include: menu.category.join(','), per_page: 99 },
      });
    }

    if (menu.tag) {
      yield connection.fetchCustomPage({
        name: 'menuTags',
        type: 'tags',
        page: 1,
        params: { include: menu.tag.join(','), per_page: 99 },
      });
    }
  }),
  fetchShareCount: flow(function*() {
    const { type, id } = getEnv(self).initialSelectedItem;
    yield self.share.all.requestCount({ type, id });
  }),
  beforeSsr: flow(function*() {
    const { settings, analytics } = self.root;
    self.lang.setLang(settings.theme.lang);

    if (analytics && analytics.googleAnalytics) {
      analytics.googleAnalytics.setAmpVars(gaVars);
      analytics.googleAnalytics.setAmpTriggers(gaTriggers);
    }

    yield self.fetchInitialState();
    yield self.fetchMenuTaxonomies();
    yield self.fetchShareCount();

    processors.forEach(proc => self.h2r.addProcessor(proc, 'low'));
  }),
}));

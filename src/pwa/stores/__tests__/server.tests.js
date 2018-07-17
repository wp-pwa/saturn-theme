import server from '../server';
import * as contexts from '../../../shared/contexts';

describe('Theme › PWA › Stores › Server', () => {
  test('`fetchSelectedItem` should call `fetchListPage` if the initial selected item is a list', () => {
    const initialSelectedItem = {
      type: 'latest',
      id: 'post',
      page: 1,
    };
    const routeChangeSucceed = jest.fn();
    const fetchListPage = jest.fn(() => Promise.resolve());

    const self = server.create(
      {},
      {
        initialSelectedItem,
      },
    );

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          routeChangeSucceed,
          fetchListPage,
        },
        settings: { theme: { menu: 'menu' } },
      },
    });

    contexts.home = jest.fn(() => 'home-context');

    self.fetchSelectedItem();

    expect(contexts.home).toHaveBeenCalledWith('menu');
    expect(routeChangeSucceed).toHaveBeenCalledWith({
      selectedItem: initialSelectedItem,
      context: 'home-context',
    });
    expect(fetchListPage).toHaveBeenCalledWith(initialSelectedItem);
  });

  test('`fetchSelectedItem` should call `fetchEntity` if the initial selected item is a single', () => {
    const initialSelectedItem = {
      type: 'post',
      id: 1,
    };
    const routeChangeSucceed = jest.fn();
    const fetchEntity = jest.fn(() => Promise.resolve());

    const self = server.create(
      {},
      {
        initialSelectedItem,
      },
    );

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          routeChangeSucceed,
          fetchEntity,
        },
        settings: { theme: { menu: {} } },
      },
    });

    contexts.singleWithLatest = jest.fn(() => 'single-context');

    self.fetchSelectedItem();

    expect(contexts.singleWithLatest).toHaveBeenCalled();
    expect(routeChangeSucceed).toHaveBeenCalledWith({
      selectedItem: initialSelectedItem,
      context: 'single-context',
    });
    expect(fetchEntity).toHaveBeenCalledWith(initialSelectedItem);
  });

  test('`beforeSsr` should call `setLang` and `fetchSelectedItem`', () => {
    const self = server.create();

    Object.defineProperties(self, {
      root: {
        writable: true,
        value: {
          settings: { theme: { lang: 'language' } },
        },
      },
      fetchSelectedItem: {
        writable: true,
        value: jest.fn(() => Promise.resolve()),
      },
    });

    Object.defineProperty(self.lang, 'setLang', {
      writable: true,
      value: jest.fn(),
    });

    self.beforeSsr();

    expect(self.lang.setLang).toHaveBeenCalledWith('language');
    expect(self.fetchSelectedItem).toHaveBeenCalled();
  });
});

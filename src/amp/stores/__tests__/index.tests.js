import index from '../index';
import * as contexts from '../../../shared/contexts';

describe('Theme › AMP › Stores › Index', () => {
  test('`fetchInitialState` should call `fetchListPage` if the initial selected item is a list', async () => {
    const initialSelectedItem = {
      type: 'latest',
      id: 'post',
      page: 1,
    };
    const routeChangeSucceed = jest.fn();
    const fetchListPage = jest.fn(() => Promise.resolve());

    const self = index.create({}, { initialSelectedItem });

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: { routeChangeSucceed, fetchListPage },
        settings: { theme: { menu: 'menu' } },
      },
    });

    contexts.home = jest.fn(() => 'home-context');
    contexts.single = jest.fn();

    await self.fetchInitialState();

    expect(contexts.home).toHaveBeenCalledWith('menu');
    expect(contexts.single).not.toHaveBeenCalled();
    expect(routeChangeSucceed).toHaveBeenCalledWith({
      selectedItem: initialSelectedItem,
      context: 'home-context',
    });
    expect(fetchListPage).toHaveBeenCalledWith(initialSelectedItem);
  });
  test('`fetchInitialState` should call `fetchEntity` and `fetchListPage` of latest post if the initial selected item is a single', async () => {
    const initialSelectedItem = {
      type: 'post',
      id: 1,
    };
    const routeChangeSucceed = jest.fn();
    const fetchListPage = jest.fn(() => Promise.resolve());
    const fetchEntity = jest.fn(() => Promise.resolve());

    const self = index.create({}, { initialSelectedItem });

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: { routeChangeSucceed, fetchListPage, fetchEntity },
        settings: { theme: { menu: 'menu' } },
      },
    });

    contexts.home = jest.fn();
    contexts.single = jest.fn(() => 'single-context');

    await self.fetchInitialState();

    expect(contexts.single).toHaveBeenCalled();
    expect(contexts.home).not.toHaveBeenCalled();
    expect(routeChangeSucceed).toHaveBeenCalledWith({
      selectedItem: initialSelectedItem,
      context: 'single-context',
    });
    expect(fetchEntity).toHaveBeenCalledWith(initialSelectedItem);
    expect(fetchListPage).toHaveBeenCalledWith({
      type: 'latest',
      id: 'post',
      page: 1,
    });
  });
  test('`fetchMenuTaxonomies` should call `fetchCustomPage` for tags and categories', async () => {
    const fetchCustomPage = jest.fn(() => Promise.resolve());

    const self = index.create();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: { fetchCustomPage },
        settings: {
          theme: {
            menu: [
              {
                type: 'latest',
                label: 'Home',
                url: 'http://www.example.com',
                page: '211',
                category: '7',
              },
              {
                type: 'category',
                label: 'Architecture',
                url: 'http://www.example.com',
                page: '211',
                category: '5',
              },
              {
                type: 'tag',
                label: 'Japan Tag',
                url: 'http://www.example.com',
                page: '211',
                category: '5',
                tag: '15',
              },
              {
                type: 'page',
                label: 'About Us Page',
                url: 'http://www.example.com',
                page: '184',
                category: '5',
              },
              {
                type: 'link',
                url: 'https://www.wikipedia.org/',
                page: '211',
                category: '5',
                label: 'Wiki External',
              },
              {
                type: 'category',
                label: 'Cities',
                url: 'http://www.example.com',
                page: '211',
                category: '4',
              },
              {
                type: 'category',
                url: 'http://www.example.com',
                page: '211',
                category: '6',
                label: 'Culture',
              },
              {
                type: 'category',
                label: 'Photography',
                url: 'http://www.example.com',
                page: '211',
                category: '3',
              },
              {
                type: 'category',
                label: 'Travel',
                url: 'http://www.example.com',
                page: '211',
                category: '8',
              },
              {
                type: 'category',
                label: 'Weekend Trip',
                url: 'http://www.example.com',
                page: '211',
                category: '1',
              },
              {
                type: 'tag',
                label: 'Island Tag',
                url: 'http://www.example.com',
                page: '211',
                category: '5',
                tag: '23',
              },
              {
                type: 'tag',
                label: 'Iceland',
                url: 'http://www.example.com',
                page: '211',
                category: '5',
                tag: '9',
              },
            ],
          },
        },
      },
    });

    await self.fetchMenuTaxonomies();

    expect(fetchCustomPage).toHaveBeenCalledTimes(2);
    expect(fetchCustomPage).toHaveBeenNthCalledWith(1, {
      name: 'menuCategories',
      type: 'category',
      page: 1,
      params: { include: '5,4,6,3,8,1', per_page: 99 },
    });
    expect(fetchCustomPage).toHaveBeenNthCalledWith(2, {
      name: 'menuTags',
      type: 'tags',
      page: 1,
      params: { include: '15,23,9', per_page: 99 },
    });
  });

  test('`fetchShareCount` should call `requestCount` with initial selected item', async () => {
    const initialSelectedItem = {
      type: 'post',
      id: 1,
    };
    const requestCount = jest.fn(() => Promise.resolve());

    const self = index.create({}, { initialSelectedItem });

    Object.defineProperty(self.share.all, 'requestCount', {
      writable: true,
      value: requestCount,
    });

    await self.fetchShareCount();

    expect(requestCount).toHaveBeenCalledWith(initialSelectedItem);
  });

  test('`beforeSsr` should setup language, analytics (if available) and call `fetchInitialState`, `fetchMenuTaxonomies` and `fetchShareCount`', async () => {
    const self = index.create();
    const setLang = jest.fn();
    const setAmpVars = jest.fn();
    const setAmpTriggers = jest.fn();
    const fetchInitialState = jest.fn(() => Promise.resolve());
    const fetchMenuTaxonomies = jest.fn(() => Promise.resolve());
    const fetchShareCount = jest.fn(() => Promise.resolve());

    Object.defineProperties(self, {
      root: {
        writable: true,
        value: {
          settings: { theme: { lang: 'language' } },
          analytics: { googleAnalytics: { setAmpVars, setAmpTriggers } },
        },
      },
      fetchInitialState: {
        writable: true,
        value: fetchInitialState,
      },
      fetchMenuTaxonomies: {
        writable: true,
        value: fetchMenuTaxonomies,
      },
      fetchShareCount: {
        writable: true,
        value: fetchShareCount,
      },
    });

    Object.defineProperty(self.lang, 'setLang', {
      writable: true,
      value: setLang,
    });

    await self.beforeSsr();

    expect(setLang).toHaveBeenCalledWith('language');
    expect(setAmpVars).toHaveBeenCalled();
    expect(setAmpTriggers).toHaveBeenCalled();
    expect(fetchInitialState).toHaveBeenCalled();
    expect(fetchMenuTaxonomies).toHaveBeenCalled();
    expect(fetchShareCount).toHaveBeenCalled();

    setAmpVars.mockClear();
    setAmpTriggers.mockClear();

    Object.defineProperty(self.root.analytics, 'googleAnalytics', {
      writable: true,
      value: undefined,
    });

    await self.beforeSsr();

    expect(setAmpVars).not.toHaveBeenCalled();
    expect(setAmpTriggers).not.toHaveBeenCalled();
  });
});

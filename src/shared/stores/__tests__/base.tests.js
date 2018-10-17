import * as mst from 'mobx-state-tree';
import base from '../index';
import menuSettings from './menuSettings.json';
import listsFromMenu from './listsFromMenu.json';
import slotsSettings from './slotsSettings.json';
import slotsForItem from './slotsForItem.json';
import slotsForColumn from './slotsForColumn.json';

const { types } = mst;

describe('Theme › Shared › Stores › Base', () => {
  test('The initial snapshot has not changed', () => {
    const self = base.create();

    expect(self).toMatchSnapshot();
  });

  test('`root` calls `getParent` with `self`', () => {
    const self = types
      .model('Root', { theme: types.optional(base, {}) })
      .create();

    mst.getParent = jest.fn(mst.getParent);

    const parent = self.theme.root;

    expect(mst.getParent).toHaveBeenCalledWith(self.theme);
    expect(parent).toBe(self);
  });

  test('`listsFromMenu` returns the menu from settings filtering anything that is not a list', () => {
    const self = base.create();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        settings: {
          theme: {
            menu: menuSettings,
          },
        },
      },
    });

    const lists = self.listsFromMenu;

    expect(lists).toEqual(listsFromMenu);
  });

  test('`listsFromMenu` returns an empty array if no menu is available in settings', () => {
    const self = base.create();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        settings: {
          theme: {},
        },
      },
    });

    const lists = self.listsFromMenu;

    expect(lists).toEqual([]);
  });

  test('`getSlotsForItem` returns the slots for the provided item', () => {
    const self = base.create();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        settings: {
          theme: {
            slots: slotsSettings,
          },
        },
      },
    });

    const slots = self.getSlotsForItem({ type: 'latest', id: 'post', page: 1 });

    expect(slots).toEqual(slotsForItem);
  });

  test('`getSlotsForItem` returns an empty array if the provided items has no slots', () => {
    const self = base.create();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        settings: {
          theme: {
            slots: slotsSettings,
          },
        },
      },
    });

    const slots = self.getSlotsForItem({ type: 'media', id: 'post', page: 1 });

    expect(slots).toEqual([]);
  });

  test('`getSlotsForItem` returns an empty array if no slots config is available in settings', () => {
    const self = base.create();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        settings: {
          theme: {},
        },
      },
    });

    const slots = self.getSlotsForItem({ type: 'latest', id: 'post', page: 1 });

    expect(slots).toEqual([]);
  });

  test('`getSlotsForColumn` returns the slots for the provided type and index', () => {
    const self = base.create();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        settings: {
          theme: {
            slots: slotsSettings,
          },
        },
      },
    });

    const slots = self.getSlotsForColumn({ type: 'post', index: 0 });

    expect(slots).toEqual(slotsForColumn);
  });

  test('`getSlotsForColumn` returns an empty array if the provided type and index have no slots', () => {
    const self = base.create();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        settings: {
          theme: {
            slots: slotsSettings,
          },
        },
      },
    });

    const slots = self.getSlotsForColumn({ type: 'post', index: 1 });

    expect(slots).toEqual([]);
  });

  test('`getSlotsForColumn` returns an empty array if no slots config is  available in settings', () => {
    const self = base.create();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        settings: {
          theme: {},
        },
      },
    });

    const slots = self.getSlotsForColumn({ type: 'post', index: 1 });

    expect(slots).toEqual([]);
  });

  test('`loadClassicVersion()` creates a cookie and reloads the page', () => {
    const self = base.create();

    window.location.reload = jest.fn();

    self.loadClassicVersion();

    expect(window.document.cookie).toBe('wppwaClassicVersion=true');
    expect(window.location.reload).toHaveBeenCalled();
  });

  test('`getNextPage` fetchs the next list page and add a new item', () => {
    const self = base.create();
    const fetchListPage = jest.fn();
    const addItemToColumn = jest.fn();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedColumn: {
            items: [
              {
                type: 'latest',
                id: 'post',
                page: 1,
              },
            ],
            index: 0,
          },
          list: jest.fn(() => ({
            page: jest.fn(() => ({
              isReady: true,
            })),
          })),
          fetchListPage,
          addItemToColumn,
        },
      },
    });

    self.getNextPage();

    expect(addItemToColumn).toHaveBeenCalledWith({
      item: {
        type: 'latest',
        id: 'post',
        page: 2,
      },
    });
    expect(fetchListPage).toHaveBeenCalledWith({
      type: 'latest',
      id: 'post',
      page: 2,
    });
  });

  test('`getNextPage` does not fecth a list page if is fetching', () => {
    const self = base.create();
    const fetchListPage = jest.fn();
    const addItemToColumn = jest.fn();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedColumn: {
            items: [
              {
                type: 'latest',
                id: 'post',
                page: 1,
              },
            ],
            index: 0,
          },
          list: jest.fn(() => ({
            page: jest.fn(() => ({
              isFetching: true,
              isReady: false,
            })),
          })),
          fetchListPage,
          addItemToColumn,
        },
      },
    });

    self.getNextPage();

    expect(fetchListPage).not.toHaveBeenCalled();
    expect(addItemToColumn).not.toHaveBeenCalled();
  });

  test('`getNextPage` retry to fetch a list page if has failed', async () => {
    const self = base.create();
    const fetchListPage = jest.fn();
    const addItemToColumn = jest.fn();

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedColumn: {
            items: [
              {
                type: 'latest',
                id: 'post',
                page: 1,
              },
            ],
            index: 0,
          },
          list: jest.fn(() => ({
            page: jest.fn(() => ({
              isFetching: false,
              isReady: false,
            })),
          })),
          fetchListPage,
          addItemToColumn,
        },
      },
    });

    self.getNextPage();

    expect(addItemToColumn).not.toHaveBeenCalled();
    expect(fetchListPage).toHaveBeenCalledWith({
      type: 'latest',
      id: 'post',
      page: 1,
    });
  });
});

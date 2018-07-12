import * as mobx from 'mobx';
import base from '../index';
import menuSettings from './menuSettings.json';
import listsFromMenu from './listsFromMenu.json';
import slotsSettings from './slotsSettings.json';
import slotsForItem from './slotsForItem.json';
import slotsForColumn from './slotsForColumn.json';

describe('Theme › Shared › Stores › Base', () => {
  test('Has `lang`, `menu`, `commentsMap`, `scroll`, `share` and `shareModal` props', () => {
    const self = base.create();

    expect(self.lang).not.toBe(undefined);
    expect(self.menu).not.toBe(undefined);
    expect(self.commentsMap).not.toBe(undefined);
    expect(self.scroll).not.toBe(undefined);
    expect(self.share).not.toBe(undefined);
    expect(self.shareModal).not.toBe(undefined);
  });

  // Don't know how to implement this test.
  // test('`root` calls `getParent` with `self`', () => {});

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

  test('`getNextPage` fetchs a list page if is not ready', () => {
    const self = base.create();
    const fetchListPage = jest.fn();

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
              isReady: false,
            })),
          })),
          fetchListPage,
          addItemToColumn: jest.fn(),
        },
      },
    });

    self.getNextPage();

    expect(fetchListPage).toHaveBeenCalledWith({
      type: 'latest',
      id: 'post',
      page: 2,
    });
  });

  test('`getNextPage` does not fecth a list page if is ready', () => {
    const self = base.create();
    const fetchListPage = jest.fn();

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
          addItemToColumn: jest.fn(),
        },
      },
    });

    self.getNextPage();

    expect(fetchListPage).not.toHaveBeenCalled();
  });

  test('`getNextPage` adds a new item to column if we did not change between column in the meanwhile', async () => {
    const self = base.create();
    const addItemToColumn = jest.fn();
    mobx.when = jest.fn(() => Promise.resolve());

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
              isReady: false,
            })),
          })),
          fetchListPage: jest.fn(),
          addItemToColumn,
        },
      },
    });

    await self.getNextPage();

    expect(addItemToColumn).toHaveBeenCalledWith({
      item: {
        type: 'latest',
        id: 'post',
        page: 2,
      },
    });
  });

  test('`getNextPage` does not add a new item to column if we changed column in the meanwhile', async () => {
    const self = base.create();
    const addItemToColumn = jest.fn();
    mobx.when = jest.fn(() => Promise.resolve());

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
              isReady: false,
            })),
          })),
          fetchListPage: jest.fn(),
          addItemToColumn,
        },
      },
    });

    const promise = self.getNextPage();

    Object.defineProperty(self.root.connection.selectedColumn, 'index', {
      writable: true,
      value: 1,
    });

    await promise;

    expect(addItemToColumn).not.toHaveBeenCalled();
  });
});

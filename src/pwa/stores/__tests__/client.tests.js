import * as mobx from 'mobx';
import * as mst from 'mobx-state-tree';
import * as utils from '../utils';
import * as scrollMiddleware from '../middleware/scroll';
import * as progressMiddleware from '../middleware/progress';
import client from '../client';

describe('Theme › PWA › Stores › Client', () => {
  test('`requestFirstExtracted()` should request lists if there is any marked as horizontal extract', async () => {
    const self = client.create();
    const hasExtracted = jest.fn(() => true);
    const fetchListPage = jest.fn();
    mobx.when = jest.fn(() => Promise.resolve());

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedContext: {
            rawColumns: [
              {
                hasExtracted,
                rawItems: [
                  {
                    type: 'latest',
                    id: 'post',
                    page: 1,
                    list: {
                      page: jest.fn(() => ({
                        isReady: false,
                        isFetching: false,
                      })),
                    },
                  },
                ],
              },
            ],
          },
          fetchListPage,
        },
      },
    });

    self.requestFirstExtracted();

    expect(hasExtracted).toHaveBeenCalledWith('horizontal');
    expect(fetchListPage).toHaveBeenCalledWith({
      type: 'latest',
      id: 'post',
      page: 1,
    });
    expect(mobx.when).toHaveBeenCalledTimes(1);
  });

  test('`requestFirstExtracted()` should not request anything if list is ready or fetching', () => {
    const self = client.create();
    const hasExtracted = jest.fn(() => true);
    const fetchListPage = jest.fn();
    mobx.when = jest.fn(() => Promise.resolve());

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedContext: {
            rawColumns: [
              {
                hasExtracted,
                rawItems: [
                  {
                    type: 'latest',
                    id: 'post',
                    page: 1,
                    list: {
                      page: jest.fn(() => ({
                        isReady: true,
                        isFetching: false,
                      })),
                    },
                  },
                ],
              },
            ],
          },
          fetchListPage,
        },
      },
    });

    self.requestFirstExtracted();

    expect(hasExtracted).toHaveBeenCalledWith('horizontal');
    expect(fetchListPage).not.toHaveBeenCalled();
    expect(mobx.when).not.toHaveBeenCalled();

    Object.defineProperty(
      self.root.connection.selectedContext.rawColumns[0].rawItems[0].list,
      'page',
      {
        writable: true,
        value: jest.fn(() => ({
          isReady: false,
          isFetching: true,
        })),
      },
    );

    self.requestFirstExtracted();

    expect(hasExtracted).toHaveBeenCalledWith('horizontal');
    expect(fetchListPage).not.toHaveBeenCalled();
    expect(mobx.when).not.toHaveBeenCalled();
  });

  test('`requestFirstExtracted()` should not request anything if no list is marked for horizontal extract', () => {
    const self = client.create();
    const hasExtracted = jest.fn(() => false);
    const fetchListPage = jest.fn();
    mobx.when = jest.fn(() => Promise.resolve());

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedContext: {
            rawColumns: [
              {
                hasExtracted,
                rawItems: [
                  {
                    type: 'latest',
                    id: 'post',
                    page: 1,
                    list: {
                      page: jest.fn(() => ({
                        isReady: false,
                        isFetchin: false,
                      })),
                    },
                  },
                ],
              },
            ],
          },
          fetchListPage,
        },
      },
    });

    self.requestFirstExtracted();

    expect(hasExtracted).toHaveBeenCalledWith('horizontal');
    expect(fetchListPage).not.toHaveBeenCalled();
    expect(mobx.when).not.toHaveBeenCalled();
  });

  test('`requestNextPageInSingle()` should request a list page if we are getting to the end of the list', () => {
    const self = client.create();
    const fetchListPage = jest.fn();
    const addColumnToContext = jest.fn();
    mobx.when = jest.fn(() => Promise.resolve());

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedColumn: {
            index: 2,
          },
          selectedContext: {
            index: 0,
            columns: [
              {},
              {},
              {},
              { items: [{ fromList: { type: 'category', id: 1, page: 1 } }] },
            ],
            options: {
              bar: 'single',
            },
            hasItem: jest.fn(() => false),
          },
          list: jest.fn(() => ({
            page: jest.fn(() => ({
              isReady: false,
              isFetching: false,
            })),
          })),
          fetchListPage,
          addColumnToContext,
        },
      },
    });

    self.requestNextPageInSingle();

    expect(fetchListPage).toHaveBeenCalledWith({
      type: 'category',
      id: 1,
      page: 2,
    });
    expect(addColumnToContext).toHaveBeenCalledWith({
      column: [{ type: 'category', id: 1, page: 2, extract: 'horizontal' }],
    });
    expect(mobx.when).toHaveBeenCalledTimes(1);
  });

  test('`requestNextPageInSingle()` should not request a list page if we are not getting to the end of the list', () => {
    const self = client.create();
    const fetchListPage = jest.fn();
    const addColumnToContext = jest.fn();
    mobx.when = jest.fn(() => Promise.resolve());

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedColumn: {
            index: 0,
          },
          selectedContext: {
            index: 0,
            columns: [
              {},
              {},
              {},
              { items: [{ fromList: { type: 'category', id: 1, page: 1 } }] },
            ],
            options: {
              bar: 'single',
            },
            hasItem: jest.fn(() => false),
          },
          list: jest.fn(() => ({
            page: jest.fn(() => ({
              isReady: false,
              isFetching: false,
            })),
          })),
          fetchListPage,
          addColumnToContext,
        },
      },
    });

    self.requestNextPageInSingle();

    expect(fetchListPage).not.toHaveBeenCalled();
    expect(addColumnToContext).not.toHaveBeenCalled();
    expect(mobx.when).not.toHaveBeenCalled();
  });

  test('`requestNextPageInSingle()` should not request a list page if we are not in a single context', () => {
    const self = client.create();
    const fetchListPage = jest.fn();
    const addColumnToContext = jest.fn();
    mobx.when = jest.fn(() => Promise.resolve());

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedColumn: {
            index: 2,
          },
          selectedContext: {
            index: 0,
            columns: [
              {},
              {},
              {},
              { items: [{ fromList: { type: 'category', id: 1, page: 1 } }] },
            ],
            options: {
              bar: 'list',
            },
            hasItem: jest.fn(() => false),
          },
          list: jest.fn(() => ({
            page: jest.fn(() => ({
              isReady: false,
              isFetching: false,
            })),
          })),
          fetchListPage,
          addColumnToContext,
        },
      },
    });

    self.requestNextPageInSingle();

    expect(fetchListPage).not.toHaveBeenCalled();
    expect(addColumnToContext).not.toHaveBeenCalled();
    expect(mobx.when).not.toHaveBeenCalled();
  });

  test('`requestNextPageInSingle()` should not add a column to context if item already exists in context', () => {
    const self = client.create();
    const fetchListPage = jest.fn();
    const addColumnToContext = jest.fn();
    mobx.when = jest.fn(() => Promise.resolve());

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedColumn: {
            index: 2,
          },
          selectedContext: {
            index: 0,
            columns: [
              {},
              {},
              {},
              { items: [{ fromList: { type: 'category', id: 1, page: 1 } }] },
            ],
            options: {
              bar: 'single',
            },
            hasItem: jest.fn(() => true),
          },
          list: jest.fn(() => ({
            page: jest.fn(() => ({
              isReady: false,
              isFetching: false,
            })),
          })),
          fetchListPage,
          addColumnToContext,
        },
      },
    });

    self.requestNextPageInSingle();

    expect(fetchListPage).toHaveBeenCalledWith({
      type: 'category',
      id: 1,
      page: 2,
    });
    expect(addColumnToContext).not.toHaveBeenCalled();
    expect(mobx.when).toHaveBeenCalledTimes(1);
  });

  test('`requestNeededLists()` should request the lists/entities in the neighbour columns if they are not ready', () => {
    const self = client.create();
    const fetchListPage = jest.fn();
    const fetchEntity = jest.fn();

    utils.filterAlreadyRequested = jest.fn(items => items);

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedContext: {
            options: {
              bar: 'list',
            },
            rawColumns: [
              { rawItems: [{ type: 'post', id: 1 }] },
              { rawItems: [{ type: 'latest', id: 'post', page: 1 }] },
              { rawItems: [{ type: 'category', id: 1, page: 1 }] },
            ],
          },
          selectedColumn: {
            index: 1,
          },
          fetchListPage,
          fetchEntity,
        },
      },
    });

    self.requestNeededLists();

    expect(fetchEntity).toHaveBeenCalledTimes(1);
    expect(fetchEntity).toHaveBeenCalledWith({
      type: 'post',
      id: 1,
    });
    expect(fetchListPage).toHaveBeenCalledTimes(2);
    expect(fetchListPage).toHaveBeenNthCalledWith(1, {
      type: 'latest',
      id: 'post',
      page: 1,
    });
    expect(fetchListPage).toHaveBeenNthCalledWith(2, {
      type: 'category',
      id: 1,
      page: 1,
    });
  });

  test('`requestNeededLists()` should not request lists/entities in the neighbour columns if they are ready', () => {
    const self = client.create();
    const fetchListPage = jest.fn();
    const fetchEntity = jest.fn();

    utils.filterAlreadyRequested = jest.fn(items => [items[1], items[2]]);

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedContext: {
            options: {
              bar: 'list',
            },
            rawColumns: [
              { rawItems: [{ type: 'post', id: 1 }] },
              { rawItems: [{ type: 'latest', id: 'post', page: 1 }] },
              { rawItems: [{ type: 'category', id: 1, page: 1 }] },
            ],
          },
          selectedColumn: {
            index: 1,
          },
          fetchListPage,
          fetchEntity,
        },
      },
    });

    self.requestNeededLists();

    expect(fetchEntity).toHaveBeenCalledTimes(1);
    expect(fetchEntity).toHaveBeenCalledWith({
      type: 'post',
      id: 1,
    });
    expect(fetchListPage).toHaveBeenCalledTimes(1);
    expect(fetchListPage).toHaveBeenCalledWith({
      type: 'category',
      id: 1,
      page: 1,
    });
  });

  test('`requestNeededLists()` should not request lists/entities if we are not in a list context', () => {
    const self = client.create();
    const fetchListPage = jest.fn();
    const fetchEntity = jest.fn();

    utils.filterAlreadyRequested = jest.fn(items => [items[1], items[2]]);

    Object.defineProperty(self, 'root', {
      writable: true,
      value: {
        connection: {
          selectedContext: {
            options: {
              bar: 'single',
            },
            rawColumns: [
              { rawItems: [{ type: 'post', id: 1 }] },
              { rawItems: [{ type: 'latest', id: 'post', page: 1 }] },
              { rawItems: [{ type: 'category', id: 1, page: 1 }] },
            ],
          },
          selectedColumn: {
            index: 1,
          },
          fetchListPage,
          fetchEntity,
        },
      },
    });

    self.requestNeededLists();

    expect(utils.filterAlreadyRequested).not.toHaveBeenCalled();
    expect(fetchEntity).not.toHaveBeenCalled();
    expect(fetchListPage).not.toHaveBeenCalled();
  });

  test('`afterCsr()` should initiate the middlewares (requestNeededLists, requestNextPageInSingle, progressMiddleware, scrollMiddleware) and call `requestFirstExtracted`, `requestNeededLists` and `scroll.initializeScrollListener`', () => {
    const self = client.create();

    Object.defineProperties(self, {
      root: {
        writable: true,
        value: {
          connection: {},
        },
      },
      requestNeededLists: {
        writable: true,
        value: jest.fn(),
      },
      requestNextPageInSingle: {
        writable: true,
        value: jest.fn(),
      },
      requestFirstExtracted: {
        writable: true,
        value: jest.fn(),
      },
    });

    Object.defineProperty(self.scroll, 'initializeScrollListener', {
      writable: true,
      value: jest.fn(),
    });

    scrollMiddleware.default = jest.fn();
    progressMiddleware.default = jest.fn();
    utils.syncActionEnds = jest.fn(() => 'syncActionEnds');
    mst.addMiddleware = jest.fn();

    self.afterCsr();

    expect(mst.addMiddleware).toHaveBeenCalledTimes(4);
    expect(mst.addMiddleware).toHaveBeenNthCalledWith(
      1,
      self.root.connection,
      'syncActionEnds',
    );
    expect(mst.addMiddleware).toHaveBeenNthCalledWith(
      2,
      self.root.connection,
      'syncActionEnds',
    );
    expect(mst.addMiddleware).toHaveBeenNthCalledWith(
      3,
      self.root.connection,
      progressMiddleware.default,
    );
    expect(mst.addMiddleware).toHaveBeenNthCalledWith(
      4,
      self.root.connection,
      scrollMiddleware.default,
    );

    expect(utils.syncActionEnds).toHaveBeenCalledTimes(2);
    expect(utils.syncActionEnds).toHaveBeenNthCalledWith(
      1,
      'routeChangeSucceed',
      self.requestNeededLists,
    );
    expect(utils.syncActionEnds).toHaveBeenNthCalledWith(
      2,
      'routeChangeSucceed',
      self.requestNextPageInSingle,
    );

    expect(self.requestFirstExtracted).toHaveBeenCalledTimes(1);
    expect(self.requestNeededLists).toHaveBeenCalledTimes(1);
    expect(self.scroll.initializeScrollListener).toHaveBeenCalledTimes(1);
  });
});

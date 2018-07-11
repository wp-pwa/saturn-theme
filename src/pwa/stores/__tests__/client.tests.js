// import client from '../client';

describe('Theme › PWA › Stores › Client', () => {
  test('`requestFirstExtracted()` should request lists if there is any marked as horizontal extract', () => {});

  test('`requestFirstExtracted()` should not request anything if no list is marked as horizontal extract', () => {});

  test('`requestNextPageInSingle()` should request a list page if we are getting to the end of the list', () => {});

  test('`requestNextPageInSingle()` should not request a list page if we are not getting to the end of the list', () => {});

  test('`requestNeededLists()` should request the lists/entities in the neighbour columns if they are not ready', () => {});

  test('`requestNeededLists()` should not request lists/entities in the neighbour columns if they are ready', () => {});

  test('`afterCsr()` should initiate the next middlewares: requestNeededLists, requestNextPageInSingle, progressMiddleware, scrollMiddleware', () => {});

  test('`afterCsr()` should call once requestFirstExtracted, requestNeededLists and initializeScrollListener', () => {});
});

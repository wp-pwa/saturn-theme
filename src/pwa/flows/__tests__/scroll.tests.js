import { types } from 'mobx-state-tree';
import {
  initializeScrollListener,
  handleScroll,
  scrollMiddleware,
} from '../scroll';
import { list } from '../../../../../wp-org-connection-app-extension-worona/src/pwa/schemas';

describe('Theme › Flows › PWA › Client › Scroll', () => {
  let fastdomPromised;
  let self;

  beforeEach(() => {
    fastdomPromised = {
      measure: jest.fn().mockReturnValue({ top: -20 }),
    };

    self = types.model('Scroll').create({}, { theme: { fastdomPromised } });
    self.handleScroll = jest.fn();
    self.setRouteChanged = jest.fn();
  });

  test('Listener is initialized', () => {
    const listener = jest.spyOn(window, 'addEventListener');

    initializeScrollListener();

    expect(listener).toHaveBeenCalled();
  });

  test('handleScroll is called with the right value', async () => {
    const listener = handleScroll(self);
    await listener();

    expect(fastdomPromised.measure).toHaveBeenCalled();
    expect(self.handleScroll).toHaveBeenCalledWith(-20);
  });

  test('handleScroll is called only once', async () => {
    const listener = handleScroll(self);
    await listener();
    await listener();

    expect(fastdomPromised.measure).toHaveBeenCalledTimes(1);
    expect(self.handleScroll).toHaveBeenCalledTimes(1);
  });

  test('handleScroll is called twice', async () => {
    const listener = handleScroll(self);
    await listener();
    await listener();
    await new Promise(resolve => setTimeout(resolve, 250));
    await listener();

    expect(fastdomPromised.measure).toHaveBeenCalledTimes(2);
    expect(self.handleScroll).toHaveBeenCalledTimes(2);
  });

  test('scrollMiddleware is triggered', () => {
    const next = jest.fn();
    const call = {
      name: 'routeChangeSucceed',
      tree: {
        theme: {
          scroll: {
            setRouteChanged: jest.fn(),
          },
        },
      },
    };

    scrollMiddleware(call, next);

    expect(next).toHaveBeenCalledWith(call);
    expect(call.tree.theme.scroll.setRouteChanged).toHaveBeenCalledWith(true);
  });

  test('scrollMiddleware is not triggered', () => {
    const next = jest.fn();
    const call = {
      name: 'NOT_routeChangeSucceed',
      tree: {
        theme: {
          scroll: {
            setRouteChanged: jest.fn(),
          },
        },
      },
    };

    scrollMiddleware(call, next);

    expect(next).toHaveBeenCalledWith(call);
    expect(call.tree.theme.scroll.setRouteChanged).not.toHaveBeenCalled();
  });
});

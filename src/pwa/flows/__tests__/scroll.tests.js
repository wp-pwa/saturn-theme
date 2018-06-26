import { types } from 'mobx-state-tree';
import {
  initializeScrollListener,
  handleScroll,
  scrollMiddleware,
} from '../scroll';

describe('Theme › Flows › PWA › Client › Scroll', () => {
  const fastdomPromised = {
    measure: jest.fn().mockReturnValue({ top: -20 }),
  };

  const self = types.model('Scroll').create({}, { theme: { fastdomPromised } });
  self.handleScroll = jest.fn();
  self.setRouteChanged = jest.fn();

  test('Listener is initialized', () => {
    const listener = jest.spyOn(window, 'addEventListener');

    initializeScrollListener();

    expect(listener).toHaveBeenCalled();
  });

  test('handleScroll is called with the right value', async () => {
    await handleScroll(self);

    expect(fastdomPromised.measure).toHaveBeenCalled();
    expect(self.handleScroll).toHaveBeenCalledWith(-20);
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

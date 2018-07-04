import { scrollMiddleware } from '../scroll';

describe('Theme › Flows › PWA › Middlewares › Scroll', () => {
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

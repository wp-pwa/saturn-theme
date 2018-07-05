import scroll from '../scroll';

describe('Theme › Shared › Stores › Scroll', () => {
  test('hideBar changes the value of isBarHidden', () => {
    const self = scroll.create();

    expect(self.isBarHidden).toBe(false);
    self.hideBar();
    expect(self.isBarHidden).toBe(true);
  });

  test('showBar changes the value of isBarHidden', () => {
    const self = scroll.create({ isBarHidden: true });

    expect(self.isBarHidden).toBe(true);
    self.showBar();
    expect(self.isBarHidden).toBe(false);
  });

  test('setRouteChanged changes the value of routeChanged', () => {
    const self = scroll.create();

    expect(self.routeChanged).toBe(false);
    self.setRouteChanged(true);
    expect(self.routeChanged).toBe(true);
    self.setRouteChanged(false);
    expect(self.routeChanged).toBe(false);
  });

  test('setLatestScroll changes the value of latestScroll', () => {
    const self = scroll.create();

    expect(self.latestScroll).toBe(0);
    self.setLatestScroll(-42);
    expect(self.latestScroll).toBe(-42);
  });

  test("handleScroll doesn't do anything if `latestScroll === top`", () => {
    const self = scroll.create({ latestScroll: -42 });
    Object.defineProperty(self, 'showBar', {
      writeable: true,
      value: jest.fn(),
    });
    Object.defineProperty(self, 'showBar', {
      writeable: true,
      value: jest.fn(),
    });
    Object.defineProperty(self, 'hideBar', {
      writeable: true,
      value: jest.fn(),
    });
    Object.defineProperty(self, 'setRouteChanged', {
      writeable: true,
      value: jest.fn(),
    });
    Object.defineProperty(self, 'setLatestScroll', {
      writeable: true,
      value: jest.fn(),
    });

    self.handleScroll(-42);
    expect(self.showBar).not.toHaveBeenCalled();
    expect(self.hideBar).not.toHaveBeenCalled();
    expect(self.setRouteChanged).not.toHaveBeenCalled();
    expect(self.setLatestScroll).not.toHaveBeenCalled();
  });

  test('If `latestScroll !== top` update the value of latestScroll', () => {
    const self = scroll.create();
    Object.defineProperty(self, 'setLatestScroll', {
      writeable: true,
      value: jest.fn(self.setLatestScroll),
    });

    self.handleScroll(-42);
    expect(self.setLatestScroll).toHaveBeenCalledWith(-42);
    self.handleScroll(0);
    expect(self.setLatestScroll).toHaveBeenCalledWith(0);
    self.handleScroll(-400);
    expect(self.setLatestScroll).toHaveBeenCalledWith(-400);
  });

  test('If the scroll is close to 0 and the bar is hidden call showBar', () => {
    const self = scroll.create({ isBarHidden: true });
    Object.defineProperty(self, 'showBar', {
      writeable: true,
      value: jest.fn(),
    });

    self.handleScroll(-20);
    expect(self.showBar).toHaveBeenCalled();
  });

  test('If scrolling down and bar is not hidden call hideBar', () => {
    const self = scroll.create({ latestScroll: -60 });
    Object.defineProperty(self, 'hideBar', {
      writeable: true,
      value: jest.fn(),
    });

    self.handleScroll(-61);
    expect(self.hideBar).toHaveBeenCalled();
  });

  test('If scrolling up and bar is hidden call showBar', () => {
    const self = scroll.create({ isBarHidden: true, latestScroll: -400 });
    Object.defineProperty(self, 'showBar', {
      writeable: true,
      value: jest.fn(),
    });

    self.handleScroll(-380);
    expect(self.showBar).toHaveBeenCalled();
  });

  test('After a route change call setRouteChanged', () => {
    const self = scroll.create({ isBarHidden: true, routeChanged: true });
    Object.defineProperty(self, 'setRouteChanged', {
      writeable: true,
      value: jest.fn(),
    });

    self.handleScroll(-350);
    expect(self.setRouteChanged).toHaveBeenCalledWith(false);
    self.handleScroll(-20);
    expect(self.setRouteChanged).toHaveBeenCalledWith(false);
  });

  test('After a route change if scroll is close to 0 and bar is hidden call showBar', () => {
    const self = scroll.create({ isBarHidden: true, routeChanged: true });
    Object.defineProperty(self, 'showBar', {
      writeable: true,
      value: jest.fn(),
    });

    self.handleScroll(-20);
    expect(self.showBar).toHaveBeenCalled();
  });

  test('After a route change if scrolled and bar is not hidden call hideBar', () => {
    const self = scroll.create({ routeChanged: true });
    Object.defineProperty(self, 'hideBar', {
      writeable: true,
      value: jest.fn(),
    });

    self.handleScroll(-200);
    expect(self.hideBar).toHaveBeenCalled();
  });

  test("After a route change if scrolled and bar is hidden don't call showBar or hideBar", () => {
    const self = scroll.create({ isBarHidden: true, routeChanged: true });
    Object.defineProperty(self, 'showBar', {
      writeable: true,
      value: jest.fn(),
    });
    Object.defineProperty(self, 'hideBar', {
      writeable: true,
      value: jest.fn(),
    });
    Object.defineProperty(self, 'setRouteChanged', {
      writeable: true,
      value: jest.fn(),
    });
    Object.defineProperty(self, 'setLatestScroll', {
      writeable: true,
      value: jest.fn(),
    });

    self.handleScroll(-200);
    expect(self.hideBar).not.toHaveBeenCalled();
    expect(self.showBar).not.toHaveBeenCalled();
    expect(self.setRouteChanged).toHaveBeenCalledWith(false);
    expect(self.setLatestScroll).toHaveBeenCalledWith(-200);
  });
});

describe('Theme › Shared › Stores › Scroll › Listener', () => {
  let fastdomPromised;
  let self;
  let listener;

  beforeEach(() => {
    fastdomPromised = {
      measure: jest.fn().mockReturnValue({ top: -20 }),
    };

    self = scroll.create({}, { theme: { fastdomPromised } });
    listener = self.scrollListener();

    Object.defineProperty(self, 'handleScroll', {
      writable: true,
      value: jest.fn(),
    });
    Object.defineProperty(self, 'setRouteChanged', {
      writable: true,
      value: jest.fn(),
    });
  });

  test('Is initialized', () => {
    window.addEventListener = jest.fn();

    self.initializeScrollListener();

    expect(window.addEventListener).toHaveBeenCalled();
  });

  test('handleScroll is called with the right value', async () => {
    await listener();

    expect(fastdomPromised.measure).toHaveBeenCalled();
    expect(self.handleScroll).toHaveBeenCalledWith(-20);
  });

  test('handleScroll is called only once', async () => {
    await listener();
    await listener();

    expect(fastdomPromised.measure).toHaveBeenCalledTimes(1);
    expect(self.handleScroll).toHaveBeenCalledTimes(1);
  });

  test('handleScroll is called twice', async () => {
    await listener();
    await listener();
    await new Promise(resolve => setTimeout(resolve, 250));
    await listener();

    expect(fastdomPromised.measure).toHaveBeenCalledTimes(2);
    expect(self.handleScroll).toHaveBeenCalledTimes(2);
  });
});

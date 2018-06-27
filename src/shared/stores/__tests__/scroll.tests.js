import scroll from '../scroll';

describe('Theme › Stores › Scroll', () => {
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
    const showBar = jest.spyOn(self, 'showBar');
    const hideBar = jest.spyOn(self, 'hideBar');
    const setRouteChanged = jest.spyOn(self, 'setRouteChanged');
    const setLatestScroll = jest.spyOn(self, 'setLatestScroll');

    self.handleScroll(-42);
    expect(showBar).not.toHaveBeenCalled();
    expect(hideBar).not.toHaveBeenCalled();
    expect(setRouteChanged).not.toHaveBeenCalled();
    expect(setLatestScroll).not.toHaveBeenCalled();
  });

  test('If `latestScroll !== top` update the value of latestScroll', () => {
    const self = scroll.create();
    const setLatestScroll = jest.spyOn(self, 'setLatestScroll');

    self.handleScroll(-42);
    expect(setLatestScroll).toHaveBeenCalledWith(-42);
    self.handleScroll(0);
    expect(setLatestScroll).toHaveBeenCalledWith(0);
    self.handleScroll(-400);
    expect(setLatestScroll).toHaveBeenCalledWith(-400);
  });

  test('If the scroll is close to 0 and the bar is hidden call showBar', () => {
    const self = scroll.create({ isBarHidden: true });
    const showBar = jest.spyOn(self, 'showBar');

    self.handleScroll(-20);
    expect(showBar).toHaveBeenCalled();
  });

  test('If scrolling down and bar is not hidden call hideBar', () => {
    const self = scroll.create({ latestScroll: -60 });
    const hideBar = jest.spyOn(self, 'hideBar');

    self.handleScroll(-61);
    expect(hideBar).toHaveBeenCalled();
  });

  test('If scrolling up and bar is hidden call showBar', () => {
    const self = scroll.create({ isBarHidden: true, latestScroll: -400 });
    const showBar = jest.spyOn(self, 'showBar');

    self.handleScroll(-380);
    expect(showBar).toHaveBeenCalled();
  });

  test('After a route change call setRouteChanged', () => {
    const self = scroll.create({ isBarHidden: true, routeChanged: true });
    const setRouteChanged = jest.spyOn(self, 'setRouteChanged');

    self.handleScroll(-350);
    expect(setRouteChanged).toHaveBeenCalledWith(false);
    self.setRouteChanged(true);
    self.handleScroll(-20);
    expect(setRouteChanged).toHaveBeenCalledWith(false);
  });

  test('After a route change if scroll is close to 0 and bar is hidden call showBar', () => {
    const self = scroll.create({ isBarHidden: true, routeChanged: true });
    const showBar = jest.spyOn(self, 'showBar');

    self.handleScroll(-20);
    expect(showBar).toHaveBeenCalled();
  });

  test('After a route change if scrolled and bar is not hidden call hideBar', () => {
    const self = scroll.create({ routeChanged: true });
    const hideBar = jest.spyOn(self, 'hideBar');

    self.handleScroll(-200);
    expect(hideBar).toHaveBeenCalled();
  });

  test("After a route change if scrolled and bar is hidden don't call showBar or hideBar", () => {
    const self = scroll.create({ isBarHidden: true, routeChanged: true });
    const showBar = jest.spyOn(self, 'showBar');
    const hideBar = jest.spyOn(self, 'hideBar');
    const setRouteChanged = jest.spyOn(self, 'setRouteChanged');
    const setLatestScroll = jest.spyOn(self, 'setLatestScroll');

    self.handleScroll(-200);
    expect(hideBar).not.toHaveBeenCalled();
    expect(showBar).not.toHaveBeenCalled();
    expect(setRouteChanged).toHaveBeenCalledWith(false);
    expect(setLatestScroll).toHaveBeenCalledWith(-200);
  });
});

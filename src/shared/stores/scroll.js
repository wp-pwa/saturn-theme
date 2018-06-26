import { types } from 'mobx-state-tree';

export default types
  .model('Scroll')
  .props({
    isBarHidden: false,
    latestScroll: 0,
    routeChanged: false,
  })
  .actions(self => ({
    hideBar() {
      self.isBarHidden = true;
    },
    showBar() {
      self.isBarHidden = false;
    },
    setRouteChanged(value) {
      self.routeChanged = value;
    },
    handleScroll(top) {
      if (self.latestScroll === top && top !== 0) return;

      if (top > -60) self.showBar();
      else if (self.routeChanged) {
        self.setRouteChanged(false);
        if (top < -60 && !self.isBarHidden) self.hideBar();
      } else if (top < self.latestScroll && !self.isBarHidden) self.hideBar();
      else if (top > self.latestScroll && self.isBarHidden) self.showBar();

      self.latestScroll = top;
    },
  }));

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
    setLatestScroll(value) {
      self.latestScroll = value;
    },
    handleScroll(top) {
      if (self.latestScroll === top) return;

      if (top > -60 && self.isBarHidden) self.showBar();
      else if (self.routeChanged) {
        self.setRouteChanged(false);
        if (top < -60 && !self.isBarHidden) self.hideBar();
      } else if (top < self.latestScroll && !self.isBarHidden) self.hideBar();
      else if (top > self.latestScroll && self.isBarHidden) self.showBar();

      self.setLatestScroll(top);
    },
  }));

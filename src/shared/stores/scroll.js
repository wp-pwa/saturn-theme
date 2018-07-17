import { types, getEnv } from 'mobx-state-tree';
import { throttle } from 'lodash';

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

      const nearTop = top >= -60;
      const belowLatest = top < self.latestScroll - 5;
      const aboveLatest = top > self.latestScroll + 5;

      if (
        self.isBarHidden &&
        (nearTop || (aboveLatest && !self.routeChanged))
      ) {
        self.showBar();
      } else if (
        !self.isBarHidden &&
        !nearTop &&
        (belowLatest || self.routeChanged)
      ) {
        self.hideBar();
      }

      if (self.routeChanged) self.setRouteChanged(false);

      self.setLatestScroll(top);
    },
    scrollListener: () =>
      throttle(async () => {
        const { fastdomPromised } = getEnv(self).theme;

        const { top } = await fastdomPromised.measure(() =>
          window.document.body.getBoundingClientRect(),
        );

        self.handleScroll(top);
      }, 200),
    initializeScrollListener() {
      window.addEventListener('scroll', self.scrollListener());
    },
  }));

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

      if (top > -60 && self.isBarHidden) self.showBar();
      else if (self.routeChanged) {
        self.setRouteChanged(false);
        if (top < -60 && !self.isBarHidden) self.hideBar();
      } else if (top < self.latestScroll && !self.isBarHidden) self.hideBar();
      else if (top > self.latestScroll && self.isBarHidden) self.showBar();

      self.setLatestScroll(top);
    },
    scrollListener: () =>
      throttle(
        async () => {
          const { fastdomPromised } = getEnv(self).theme;

          const { top } = await fastdomPromised.measure(() =>
            window.document.body.getBoundingClientRect(),
          );

          self.handleScroll(top);
        },
        200,
        { trailing: false },
      ),
    initializeScrollListener() {
      window.addEventListener('scroll', self.scrollListener());
    },
  }));

import { types } from 'mobx-state-tree';

export default types
  .model('Scroll')
  .props({
    isBarHidden: types.optional(types.boolean, false),
  })
  .actions(self => {
    const scroll = {
      latestDirection: null,
      latestScroll: 0,
    };

    return {
      hideBar() {
        if (!self.isBarHidden) self.isBarHidden = true;
      },
      showBar() {
        if (self.isBarHidden) self.isBarHidden = false;
      },
      handleScroll(top) {
        const { isBarHidden, hideBar, showBar } = self;
        const { latestDirection, latestScroll } = scroll;

        if (latestScroll === top && top !== 0) return;

        const isScrollingUp = latestScroll > top;
        scroll.latestScroll = top;

        // Shows top bars if the scroll is too close to the top.
        if (top > -60) {
          if (isBarHidden) showBar();
        } else if (isScrollingUp) {
          // Shows/hiddes bars depending on scroll direction.
          if (latestDirection !== 'up') {
            if (!isBarHidden) hideBar();
            scroll.latestDirection = 'up';
          }
        } else if (latestDirection !== 'down') {
          if (isBarHidden) showBar();
          scroll.latestDirection = 'down';
        }
      },
    };
  });

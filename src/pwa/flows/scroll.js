import { throttle } from 'lodash';
import fastdom from 'fastdom';
import fdPromised from 'fastdom/extensions/fastdom-promised';

const fastdomPromised = fastdom.extend(fdPromised);

export default async self => {
  const { showBar, hideBar } = self.theme.scroll;

  // Define initial state of scroll.
  const scroll = {
    latestDirection: null,
    latestScroll: 0,
  };

  window.addEventListener(
    'scroll',
    throttle(async () => {
      const { top } = await fastdomPromised.measure(() =>
        window.document.body.getBoundingClientRect(),
      );

      if (scroll.latestScroll === top && top !== 0) return;

      // Shows top bars if the scroll is too close to the top.
      if (top > -60) {
        if (scroll.latestDirection) {
          showBar();
          scroll.latestDirection = null;
        }
      } else if (scroll.latestScroll > top) {
        // Shows/hiddes bars depending on scroll direction.
        if (scroll.latestDirection !== 'up') {
          hideBar();
          scroll.latestDirection = 'up';
        }
      } else if (scroll.latestDirection !== 'down') {
        showBar();
        scroll.latestDirection = 'down';
      }

      scroll.latestScroll = top;
    }, 100),
  );
};

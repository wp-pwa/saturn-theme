import { throttle } from 'lodash';
import { getEnv } from 'mobx-state-tree';

let latestScroll = 0;

export const handleScroll = self =>
  throttle(async () => {
    const { latestDirection, setLatestDirection, showBar, hideBar } = self;

    const { fastdomPromised } = getEnv(self).theme;

    const { top } = await fastdomPromised.measure(() =>
      window.document.body.getBoundingClientRect(),
    );

    if (latestScroll === top && top !== 0) return;

    // Shows top bars if the scroll is too close to the top.
    if (top > -60) {
      showBar();
      if (latestDirection !== 'reset') setLatestDirection('reset');
    } else if (latestScroll > top) {
      // Shows/hiddes bars depending on scroll direction.
      if (latestDirection !== 'up') {
        hideBar();
        setLatestDirection('up');
      }
    } else if (latestDirection !== 'down') {
      if (latestDirection !== 'reset') showBar();
      setLatestDirection('down');
    }

    latestScroll = top;
  }, 100);

export const initializeScrollListener = async self => {
  window.addEventListener('scroll', handleScroll(self));
};

export const scrollMiddleware = (call, next) => {
  if (call.name === 'routeChangeSucceed') {
    call.tree.theme.scroll.setLatestDirection('reset');
  }

  next(call);
};

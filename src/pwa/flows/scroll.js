import { throttle } from 'lodash';
import { getEnv } from 'mobx-state-tree';

export const handleScroll = self =>
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
  );

export const initializeScrollListener = async self => {
  window.addEventListener('scroll', handleScroll(self));
};

export const scrollMiddleware = (call, next) => {
  if (call.name === 'routeChangeSucceed') {
    call.tree.theme.scroll.setRouteChanged(true);
  }

  next(call);
};

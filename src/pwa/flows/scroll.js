import { throttle } from 'lodash';
import { getEnv } from 'mobx-state-tree';

export const handleScroll = async self => {
  const { fastdomPromised } = getEnv(self).theme;

  const { top } = await fastdomPromised.measure(() =>
    window.document.body.getBoundingClientRect(),
  );

  self.handleScroll(top);
};

export const initializeScrollListener = async self => {
  window.addEventListener('scroll', throttle(() => handleScroll(self), 100));
};

export const scrollMiddleware = (call, next) => {
  if (call.name === 'routeChangeSucceed')
    call.tree.theme.scroll.setRouteChanged(true);

  next(call);
};

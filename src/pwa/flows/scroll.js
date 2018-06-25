import { throttle } from 'lodash';
import fastdom from 'fastdom';
import fdPromised from 'fastdom/extensions/fastdom-promised';
import { getScrollingElement } from '../../shared/helpers';

const fastdomPromised = fastdom.extend(fdPromised);

export default async self => {
  const { theme } = self;
  const scrollingElement = await getScrollingElement();
  window.addEventListener(
    'scroll',
    throttle(async () => {
      const getBoundingClientRectPromise = fastdomPromised.measure(() =>
        scrollingElement.getBoundingClientRect(),
      );
      const innerHeightPromise = fastdomPromised.measure(
        () => window.innerHeight,
      );
      const [{ top }] = await Promise.all([
        getBoundingClientRectPromise,
        innerHeightPromise,
      ]);

      return theme.scroll.handleScroll(top);
    }, 100),
  );
};

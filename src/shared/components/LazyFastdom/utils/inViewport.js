import { getBoundingClientRect, getElementBox, getWindowProps } from './fastdom';

// Finds element's position relative to the whole document,
// rather than to the viewport as it is the case with .getBoundingClientRect().
const getElementPosition = (elementClientRect, windowProps) => {
  const { top, left } = elementClientRect;
  const { pageXOffset, pageYOffset } = windowProps;
  return {
    top: top + pageYOffset,
    left: left + pageXOffset,
  };
};

export default async function inViewport(element, container, customOffset) {
  const [elementClientRect, elementBox, windowProps] = await Promise.all([
    getBoundingClientRect(element),
    getElementBox(element),
    getWindowProps(),
  ]);

  if (!element || elementBox.offsetParent === null) { // isHidden
    return false;
  }

  let top;
  let bottom;
  let left;
  let right;

  if (typeof container === 'undefined' || container === window) {
    top = windowProps.pageYOffset;
    left = windowProps.pageXOffset;
    bottom = top + windowProps.innerHeight;
    right = left + windowProps.innerWidth;
  } else {
    const [containerClientRect, containerBox] = await Promise.all([
      getBoundingClientRect(container),
      getElementBox(container),
    ]);

    const containerPosition = getElementPosition(containerClientRect, windowProps);

    ({ top } = containerPosition);
    ({ left } = containerPosition);
    bottom = top + containerBox.offsetHeight;
    right = left + containerBox.offsetWidth;
  }

  const elementPosition = getElementPosition(elementClientRect, windowProps);

  return (
    top <= elementPosition.top + elementBox.offsetHeight + customOffset.top &&
    bottom >= elementPosition.top - customOffset.bottom &&
    left <= elementPosition.left + elementBox.offsetWidth + customOffset.left &&
    right >= elementPosition.left - customOffset.right
  );
}

export default {
  test: element =>
    element &&
    element.tagName === 'ins' &&
    element.attributes &&
    element.attributes.className &&
    element.attributes.className.includes('adsbygoogle'),
  converter: () => null,
};

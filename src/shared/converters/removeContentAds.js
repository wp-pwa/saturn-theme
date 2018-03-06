export default {
  test: element =>
    element &&
    element.tagName === 'div' &&
    element.attributes &&
    ((element.attributes.className && element.attributes.className.includes('inside-banner')) ||
      (element.attributes.id && element.attributes.id === 'inside-banner')),
  converter: () => null,
};

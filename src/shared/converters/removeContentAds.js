export default {
  test: element =>
    element &&
    element.tagName === 'div' &&
    element.attributes &&
    ((element.attributes.className && element.attributes.className.includes('inside-banner')) ||
      (element.attributes.id && element.attributes.id === 'inside-banner')) &&
    element.children.find(
      child =>
        child.tagName === 'ins' &&
        child.attributes &&
        child.attributes.className &&
        child.attributes.className.includes('adsbygoogle'),
    ),
  converter: () => null,
};

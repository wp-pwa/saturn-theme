export default {
  test: ({ tagName, attributes }) =>
    tagName === 'aside' &&
    attributes &&
    attributes.className &&
    attributes.className.split(' ').includes('gaz_relnot'),
  process: () => null,
};

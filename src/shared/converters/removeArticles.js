export default {
  test: ({ component, attributes }) =>
    component === 'aside' &&
    attributes &&
    attributes.className &&
    attributes.className.split(' ').includes('gaz_relnot'),
  process: () => null,
};

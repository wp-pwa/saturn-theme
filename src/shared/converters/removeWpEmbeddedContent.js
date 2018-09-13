export default {
  test: ({ attributes }) =>
    attributes.className &&
    attributes.className.split(' ').includes('wp-embedded-content'),
  process: () => null,
};

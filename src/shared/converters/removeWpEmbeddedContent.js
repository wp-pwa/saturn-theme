export default {
  test: ({ attributes }) =>
    attributes.className &&
    attributes.className.includes('wp-embedded-content'),
  process: () => null,
};

export default {
  test: ({ attributes }) =>
    attributes.className &&
    attributes.className.includes('wp-embedded-content'),
  converter: () => null,
};

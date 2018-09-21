export default {
  test: ({ props }) =>
    props.className &&
    props.className.split(' ').includes('wp-embedded-content'),
  process: () => null,
};

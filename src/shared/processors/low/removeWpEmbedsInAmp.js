export default {
  test: ({ props }, { stores }) =>
    stores.build.isAmp &&
    props.className &&
    props.className.split(' ').includes('wp-embedded-content'),
  process: () => null,
};

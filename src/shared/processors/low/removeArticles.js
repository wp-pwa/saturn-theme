export default {
  test: ({ component, props }) =>
    component === 'aside' &&
    props &&
    props.className &&
    props.className.split(' ').includes('gaz_relnot'),
  process: () => null,
};

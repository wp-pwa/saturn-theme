export default {
  test: ({ component, props }) =>
    component === 'div' &&
    props &&
    props.className &&
    props.className.includes('tiled-gallery'),
  process: element => {
    element.props.id = 'gallery-0';
    return element;
  },
};

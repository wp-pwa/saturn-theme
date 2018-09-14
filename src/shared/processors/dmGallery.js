export default {
  test: ({ component, props }) =>
    component === 'div' &&
    props &&
    props.className &&
    props.className.split(' ').includes('gallery_regular'),
  process: element => {
    element.props.id = 'gallery-0';
    return element;
  },
};

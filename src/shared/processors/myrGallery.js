export default {
  test: ({ component, props }) =>
    component === 'div' &&
    props &&
    props.className &&
    props.className.includes('td-slide-on-2-columns'),
  process: element => {
    element.props.id = 'gallery-0';
    return element;
  },
};

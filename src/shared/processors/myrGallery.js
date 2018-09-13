export default {
  test: ({ component, attributes }) =>
    component === 'div' &&
    attributes &&
    attributes.className &&
    attributes.className.split(' ').includes('td-slide-on-2-columns'),
  process: element => {
    element.attributes.id = 'gallery-0';
    return element;
  },
};

export default {
  test: ({ component, attributes }) =>
    component === 'div' &&
    attributes &&
    attributes.className &&
    attributes.className.split(' ').includes('tiled-gallery'),
  process: element => {
    element.attributes.id = 'gallery-0';
    return element;
  },
};

export default {
  test: ({ attributes }, { stores }) =>
    stores.build.isAmp && attributes.id === 'amp',
  process: element => {
    element.attributes.id = null;

    return element;
  },
};

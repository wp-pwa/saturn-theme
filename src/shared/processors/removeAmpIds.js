export default {
  test: ({ attributes }) => attributes.id === 'amp',
  process: (element, { stores }) => {
    if (stores.build.isAmp) {
      element.attributes.id = null;
    }

    return element;
  },
};

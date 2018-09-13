export default {
  test: ({ component }, { stores }) =>
    stores.build.isAmp && component === 'col',
  process: element => {
    Object.keys(element.attributes).forEach(key => {
      if (key !== 'span') delete element.attributes[key];
    });

    return element;
  },
};

export default {
  test: ({ component }, { stores }) =>
    stores.build.isAmp && component === 'col',
  process: element => {
    Object.keys(element.props).forEach(key => {
      if (key !== 'span') delete element.props[key];
    });

    return element;
  },
};

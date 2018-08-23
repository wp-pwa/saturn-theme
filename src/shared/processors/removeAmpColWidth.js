export default {
  test: ({ tagName }, { stores }) => stores.build.isAmp && tagName === 'col',
  process: element => {
    Object.keys(element.attributes).forEach(key => {
      if (key !== 'span') delete element.attributes[key];
    });

    return element;
  },
};

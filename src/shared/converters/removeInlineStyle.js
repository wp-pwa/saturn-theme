export default {
  test: element => element && element.attributes && element.attributes.style,
  converter: element => {
    element.attributes.style = null;
    return element;
  },
};

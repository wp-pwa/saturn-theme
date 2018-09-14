export default {
  test: element => element && element.props && element.props.style,
  process: element => {
    delete element.props.style;
    return element;
  },
};

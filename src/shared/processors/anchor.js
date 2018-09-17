export default {
  test: ({ tagName }) => tagName === 'a',
  process: element => {
    if (element.props.className) {
      element.props.className.push('content-link');
    } else {
      element.props.className = ['content-link'];
    }

    return element;
  },
};

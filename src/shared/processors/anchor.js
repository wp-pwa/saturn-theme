export default {
  test: ({ tagName }) => tagName === 'a',
  process: element => {
    if (element.attributes.className) {
      element.attributes.className.push('content-link');
    } else {
      element.attributes.className = ['content-link'];
    }

    return element;
  },
};

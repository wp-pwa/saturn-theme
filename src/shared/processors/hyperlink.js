export default {
  test: ({ tagName }) => tagName === 'a',
  process: (element, extraProps, state) => {
    console.log('HYPERLINK', state);
    element.style = Object.assign(element.style || {}, { color: 'red' });
    return element;
  },
};

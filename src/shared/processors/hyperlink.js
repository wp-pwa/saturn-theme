export default {
  test: ({ tagName }) => tagName === 'a',
  process: (element, extraProps, state) => {
      element.style.color = state.color;
      return element;
  }
};

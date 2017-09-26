import he from 'he';

export default {
  test: ({ tagName, attributes, children }) =>
    tagName === 'p' &&
    children.every(({ type, content }) => type === 'Text' && !he.decode(content).trim()) &&
    !attributes['data-lazy'],
  converter: () => null,
};

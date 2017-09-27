export default {
  test: ({ tagName, attributes, children }) =>
    tagName === 'p' &&
    !attributes['data-lazy'] &&
    children[0].tagName === 'script' &&
    children[0].attributes.src === '//platform.twitter.com/widgets.js',
  converter: () => null,
};

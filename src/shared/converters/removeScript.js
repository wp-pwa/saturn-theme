// const scriptsToRemove = [
//   '//platform.twitter.com/widgets.js',
//   'https://platform.twitter.com/widgets.js',
//   '//platform.instagram.com/en_US/embeds.js',
//   'https://platform.instagram.com/en_US/embeds.js',
// ];

export default {
  test: ({ component, children }) =>
    component === 'script' ||
    (component === 'p' && children[0].component === 'script'),
  // && scriptsToRemove.includes(children[0].props.src),
  process: () => null,
};

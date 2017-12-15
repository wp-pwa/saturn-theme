const scriptsToRemove = [
  "//platform.twitter.com/widgets.js",
  "https://platform.twitter.com/widgets.js",
  "//platform.instagram.com/en_US/embeds.js",
  "https://platform.instagram.com/en_US/embeds.js",
];

export default {
  test: ({ tagName, attributes, children }) =>
    tagName === "p" &&
    !attributes["data-lazy"] &&
    children[0].tagName === "script" &&
    scriptsToRemove.includes(children[0].attributes.src),
  converter: () => null,
};

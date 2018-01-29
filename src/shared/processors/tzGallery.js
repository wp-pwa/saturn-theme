export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' &&
    attributes &&
    attributes.className &&
    attributes.className.find(name => /^mc-[\w|-]+gallery$/.test(name)),
  process: ({ attributes: { id } }) => {
    debugger;
    const ids = new Set(id.split('-').reduce((all, splited) => all.concat(splited.split(',')), []));

    const children = Array.from(ids).map(attachmentId => ({
      type: 'Element',
      tagName: 'img',
      attributes: {
        dataset: {
          attachmentId,
        },
      },
    }));

    return {
      type: 'Element',
      tagName: 'div',
      attributes: { className: ['gallery-1'] },
      children,
    };
  },
};

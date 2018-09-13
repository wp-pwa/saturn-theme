const idFormat = /^(?:\d+)-(?:\d+,)+(?:\d)+$/g;

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' &&
    attributes &&
    attributes.id &&
    idFormat.test(attributes.id) &&
    attributes.className &&
    attributes.className
      .split(' ')
      .find(name => /^mc-[\w|-]+gallery/.test(name)),
  process: ({ attributes: { id } }) => {
    const ids = new Set(id.match(/(\d+)/g));
    const children = Array.from(ids).map(mediaId => ({
      type: 'Element',
      tagName: 'img',
      attributes: {
        'data-attachment-id': parseInt(mediaId, 10),
      },
      children: [],
    }));

    return {
      type: 'Element',
      tagName: 'div',
      attributes: { id: 'gallery-0' },
      children,
    };
  },
};

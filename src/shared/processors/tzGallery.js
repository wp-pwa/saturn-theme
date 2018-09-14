const idFormat = /^(?:\d+)-(?:\d+,)+(?:\d)+$/g;

export default {
  test: ({ component, props }) =>
    component === 'div' &&
    props &&
    props.id &&
    idFormat.test(props.id) &&
    props.className &&
    props.className.split(' ').find(name => /^mc-[\w|-]+gallery/.test(name)),
  process: ({ props: { id } }) => {
    const ids = new Set(id.match(/(\d+)/g));
    const children = Array.from(ids).map(mediaId => ({
      type: 'element',
      component: 'img',
      props: {
        'data-attachment-id': parseInt(mediaId, 10),
      },
      children: [],
    }));

    return {
      type: 'element',
      component: 'div',
      props: { id: 'gallery-0' },
      children,
    };
  },
};

import LazyYoutube from '../../components/LazyYoutube';

export default {
  test: ({ component, props }) =>
    component === 'iframe' &&
    (/youtube/.test(props.src) || /youtube/.test(props['data-src'])),
  process: element => {
    const { props } = element;

    let height;

    if (props.height && props.width) {
      height = `${(props.height / props.width) * 100}vw`;
    } else {
      height = '120px';
    }

    if (!props.src) props.src = props['data-src'];

    const match =
      props.src.match(/\/embed\/([\d\w-]+)/) ||
      props.src.match(/\/([\d\w-]+?)\?/);

    const youtubeId = match ? match[1] : null;

    return {
      component: LazyYoutube,
      props: {
        key: `youtube${youtubeId}`,
        width: '100vw',
        height,
        youtubeId,
        attributes: props,
      },
      children: null,
    };
  },
};

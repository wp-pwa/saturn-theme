import LazyVideo from '../components/LazyVideo';

export default {
  test: ({ component }) => component === 'video',
  process: element => {
    const { props } = element;

    let height;

    if (props.height && props.width) {
      height = `${(props.height * 100) / props.width}vw`; // prettier-ignore
    } else {
      height = '120px';
    }

    return {
      component: LazyVideo,
      props: {
        width: '100vw',
        height,
        throttle: 50,
        attributes: props,
      },
    };
  },
};

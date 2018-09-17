import LazySoundcloud from '../components/LazySoundcloud';

export default {
  test: ({ component, props }) =>
    component === 'iframe' && props.src.includes('soundcloud'),
  process: element => {
    const { props } = element;

    let height;

    if (props.height && props.width) {
      if (props.width.includes('%')) {
        height = `${props.height}px`;
      } else {
        height = `${(props.height * 100) / props.width}vw`; // prettier-ignore
      }
    } else {
      height = '120px';
    }

    const httpRegexp = /^http:\/\//;

    if (props.src.match(httpRegexp)) {
      props.src = props.src.replace(httpRegexp, 'https://');
    }

    const [, track, color] = /tracks\/(\d+).+color=%(\w{6})/g.exec(props.src);

    return {
      component: LazySoundcloud,
      props: {
        height,
        width: '100%',
        track,
        color,
        attributes: props,
      },
      children: null,
    };
  },
};

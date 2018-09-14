import Anchor from '../components/Anchor';

export default {
  test: ({ component, props }) =>
    component === 'a' && props.href && /^#(\S+)/.test(props.href),
  process: ({ props, children }, { extraProps }) => ({
    component: Anchor,
    props: {
      key: props.href,
      hash: props.href,
      item: extraProps.item,
      className: props.className,
    },
    children,
  }),
};

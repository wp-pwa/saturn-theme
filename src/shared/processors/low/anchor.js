import Anchor from '../../components/Anchor';

export default {
  test: ({ component, props }) =>
    component === 'a' && props.href && /^#(\S+)/.test(props.href),
  process: ({ props, children }, { item }) => ({
    component: Anchor,
    props: {
      key: props.href,
      hash: props.href,
      className: props.className,
      item,
    },
    children,
  }),
};

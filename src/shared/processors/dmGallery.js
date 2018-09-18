export default {
  test: ({ component, props }) =>
    component === 'div' &&
    props &&
    props.className &&
    props.className.split(' ').includes('gallery_regular'),
  process: ({ props }) => {
    const { id: _, ...others } = props;
    return { props: { id: 'gallery-0', ...others } };
  },
};

export default {
  test: ({ props }) =>
    props &&
    props.style &&
    (props.style.display === 'none' || props.style.visibility === 'hidden'),
  process: () => null,
};

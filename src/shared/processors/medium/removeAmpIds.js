export default {
  test: ({ props }, { stores }) => stores.build.isAmp && props.id === 'amp',
  process: element => {
    element.props.id = null;

    return element;
  },
};

export default {
  test: element => {
    if (element.component === 'div') {
      if (
        element.props &&
        element.props.className &&
        element.props.className.split(' ').includes('inside-banner')
      ) {
        return true;
      } else if (
        element.props &&
        element.props.id &&
        element.props.id === 'inside-banner'
      ) {
        return true;
      } else if (
        element.children.find(
          child =>
            child.props &&
            child.props.className &&
            child.props.className.split(' ').includes('lazyload_ad'),
        )
      ) {
        return true;
      }
    }

    return false;
  },
  process: () => null,
};

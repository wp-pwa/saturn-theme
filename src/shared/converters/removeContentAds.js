export default {
  test: element => {
    if (element.component === 'div') {
      if (
        element.attributes &&
        element.attributes.className &&
        element.attributes.className.split(' ').includes('inside-banner')
      ) {
        return true;
      } else if (
        element.attributes &&
        element.attributes.id &&
        element.attributes.id === 'inside-banner'
      ) {
        return true;
      } else if (
        element.children.find(
          child =>
            child.attributes &&
            child.attributes.className &&
            child.attributes.className.split(' ').includes('lazyload_ad'),
        )
      ) {
        return true;
      }
    }

    return false;
  },
  process: () => null,
};

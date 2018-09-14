const classNames = {
  disc: 'list-disc',
  circle: 'list-circle',
  square: 'list-square',
  a: 'list-lower-latin',
  A: 'list-upper-latin',
  i: 'list-lower-roman',
  I: 'list-upper-roman',
  '1': 'list-decimal',
};

export default {
  test: ({ component, props }, { stores }) =>
    stores.build.isAmp &&
    (component === 'ul' || component === 'ol' || component === 'li') &&
    props.type,
  process: element => {
    const { className } = element.props;
    element.props.className = className
      ? `${className} ${classNames[element.props.type]}`
      : classNames[element.props.type];

    delete element.props.type;

    return element;
  },
};

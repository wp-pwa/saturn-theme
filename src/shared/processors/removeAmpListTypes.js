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
  test: ({ component, attributes }, { stores }) =>
    stores.build.isAmp &&
    (component === 'ul' || component === 'ol' || component === 'li') &&
    attributes.type,
  process: element => {
    const { className } = element.attributes;
    element.attributes.className = className
      ? `${className} ${classNames[element.attributes.type]}`
      : classNames[element.attributes.type];

    delete element.attributes.type;

    return element;
  },
};

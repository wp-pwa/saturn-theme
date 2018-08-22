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
  test: ({ tagName, attributes }, { stores }) =>
    stores.build.isAmp &&
    (tagName === 'ul' || tagName === 'ol' || tagName === 'li') &&
    attributes.type,
  process: element => {
    if (element.attributes.className) {
      element.attributes.className.push(classNames[element.attributes.type]);
    } else {
      element.attributes.className = [classNames[element.attributes.type]];
    }

    delete element.attributes.type;

    return element;
  },
};

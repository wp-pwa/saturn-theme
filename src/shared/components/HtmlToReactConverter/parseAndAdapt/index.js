import { parse } from 'himalaya';
import filterAttributes from './filterAttributes';

// Adapts the new Himalaya AST Specification v1
// (see https://github.com/andrejewski/himalaya/blob/v1.0.1/text/ast-spec-v1.md)
// to our format, with the following structure:
// {
//   type: 'element',
//   component: 'p',
//   props: {},
//   children: [],
//   parent: Element,
// }

const adaptNode = (element, parent) => {
  const { type, tagName, attributes, children = [] } = element;

  // do not transform texts or comments
  if (type !== 'element') {
    return { ...element, parent };
  }

  const adapted = {
    type,
    component: tagName,
    props: filterAttributes(
      attributes.reduce((attrs, { key, value }) => {
        if (key === 'class') {
          attrs.className = value;
        } else attrs[key] = value;
        return attrs;
      }, {}),
    ),
    parent,
  };

  adapted.children = children.map(el => adaptNode(el, adapted));

  return adapted;
};

export default html => parse(html).map(el => adaptNode(el));

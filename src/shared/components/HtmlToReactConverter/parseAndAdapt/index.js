import { parse } from 'himalaya';
import filterAttributes from './filterAttributes';

// Adapts the new Himalaya AST Specification v1
// to the old Himalaya AST Specification v0, used by converters and processors.
// See https://github.com/andrejewski/himalaya/blob/v1.0.1/text/ast-spec-v1.md
// and https://github.com/andrejewski/himalaya/blob/v1.0.1/text/ast-spec-v0.md
const adaptNode = (element, parent) => {
  const { type, tagName, attributes, children } = element;

  // do not transform texts or comments
  if (type !== 'element') {
    return { ...element, parent };
  }

  return {
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
    children,
    parent,
  };
};

const adaptNodes = (nodes, parent = null) =>
  nodes.map(n => {
    if (n.children) n.children = adaptNodes(n.children, n);
    return adaptNode(n, parent);
  });

export default html => adaptNodes(parse(html));

import { parse } from 'himalaya';
import he from 'he';
import htmlMap from './htmlMap';
import svgMap from './svgMap';

// Map of lowercased HTML and SVG attributes to get their camelCase version.
const attrMap = { ...htmlMap, ...svgMap };

// Adapts the Himalaya AST Specification v1
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
  const { type, tagName, attributes, children } = element;

  // Do not adapt 'text' or 'comment' nodes,
  // just decode escaped html characters.
  if (type !== 'element') {
    const content = he.decode(element.content);
    // Return null if empty (or only whitespaces).
    return content.trim().length ? { type, content, parent } : null;
  }

  const adapted = {
    type,
    component: tagName,
    props: attributes.reduce((attrs, { key, value }) => {
      if (key === 'class') {
        attrs.className = value;
      } else if (!/^on/.test(key)) {
        const camelCaseKey = attrMap[key.toLowerCase()];
        attrs[camelCaseKey || key] = value;
      }
      return attrs;
    }, {}),
  };

  // Parent cannot be changed.
  Object.defineProperty(adapted, 'parent', { value: parent });

  adapted.children = children.reduce((all, child) => {
    const childAdapted = adaptNode(child, adapted);
    // ignore null children
    if (childAdapted) all.push(childAdapted);
    return all;
  }, []);

  return adapted;
};

// Parse HTML code using Himalaya's parse function first, and then
// adapting each node to our format.
export default html =>
  parse(html).reduce((htmlTree, element) => {
    const adapted = adaptNode(element, null);
    if (adapted) htmlTree.push(adapted);
    return htmlTree;
  }, []);

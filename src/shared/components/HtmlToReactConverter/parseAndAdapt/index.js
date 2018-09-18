import { parse } from 'himalaya';
import he from 'he';
import htmlMap from './htmlMap';
import svgMap from './svgMap';

const allMap = { ...htmlMap, ...svgMap };

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
  const { type, tagName, attributes, children = [] } = element;

  // do not transform 'text' or 'comment' nodes
  if (type !== 'element') {
    const content = he.decode(element.content);
    // return null if empty (or only whitespaces)
    return content.trim().length ? { type, content, parent } : null;
  }

  const adapted = {
    type,
    parent,
    component: tagName,
    props: attributes.reduce((attrs, { key, value }) => {
      if (key === 'class') {
        attrs.className = value;
      } else if (!/^on/.test(key)) {
        const newKey = allMap[key.toLowerCase()];
        attrs[newKey || key] = value;
      }
      return attrs;
    }, {}),
  };

  adapted.children = children.reduce((all, child) => {
    const childAdapted = adaptNode(child, adapted);
    // ignore null children
    if (childAdapted) all.push(childAdapted);
    return all;
  }, []);

  return adapted;
};

export default html =>
  parse(html).reduce((htmlTree, element) => {
    const adapted = adaptNode(element, null);
    if (adapted) htmlTree.push(adapted);
    return htmlTree;
  }, []);

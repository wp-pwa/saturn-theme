import React from 'react';
import { camelCase, capitalize } from 'lodash';

// Adapts the new Himalaya AST Specification v1
// to the old Himalaya AST Specification v0, used by converters and processors.
// See https://github.com/andrejewski/himalaya/blob/v1.0.1/text/ast-spec-v1.md
// and https://github.com/andrejewski/himalaya/blob/v1.0.1/text/ast-spec-v0.md
const adaptNode = element => {
  const isData = /^data-(.*)/;
  const attributes = {};
  element.type = capitalize(element.type);
  if (element.attributes && element.attributes.length > 0) {
    element.attributes.forEach(({ key, value }) => {
      const match = isData.exec(key);
      if (key === 'class') {
        attributes.className = value.split(' ');
      } else if (match) {
        if (!attributes.dataset) attributes.dataset = {};
        attributes.dataset[camelCase(match[1])] = value;
      } else attributes[key] = value;
    });
    element.attributes = attributes;
  } else {
    element.attributes = {};
  }
  return element;
};

export const adaptNodes = nodes =>
  nodes.map(n => {
    if (n.children) n.children = adaptNodes(n.children);
    return adaptNode(n);
  });

export const removeEmptyNodes = nodes =>
  nodes.filter(node => {
    if (node.type === 'element') {
      node.children = removeEmptyNodes(node.children);
      return true;
    }
    return node.content.trim().length;
  });

export const isValidReact = element =>
  React.isValidElement(element) ||
  (element instanceof Array && element.every(React.isValidElement));

export const extractIfOneChild = children =>
  children.length === 1 ? children[0] : children;

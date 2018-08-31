import React from 'react';
import { camelCase, capitalize } from 'lodash';

// Adapts the new Himalaya AST Specification v1
// to the old Himalaya AST Specification v0, used by converters and processors.
// See https://github.com/andrejewski/himalaya/blob/v1.0.1/text/ast-spec-v1.md
// and https://github.com/andrejewski/himalaya/blob/v1.0.1/text/ast-spec-v0.md
export const adaptNodes = nodes =>
  nodes.map(node => {
    // First adapt children nodes
    if (node.children) node.children = adaptNodes(node.children);

    // Then adapt the current node
    const isData = /^data-(.*)/;
    const attributes = {};
    node.type = capitalize(node.type);

    if (node.attributes && node.attributes.length > 0) {
      node.attributes.forEach(({ key, value }) => {
        const match = isData.exec(key);
        if (key === 'class') {
          attributes.className = value.split(' ');
        } else if (match) {
          if (!attributes.dataset) attributes.dataset = {};
          attributes.dataset[camelCase(match[1])] = value;
        } else attributes[key] = value;
      });
      node.attributes = attributes;
    } else {
      node.attributes = {};
    }
    return node;
  });

export const cleanNodes = nodes =>
  nodes.filter(node => {
    if (node.type === 'element') {
      node.children = cleanNodes(node.children);
      return true;
    }
    return !(
      node.type === 'comment' ||
      (node.type === 'text' && !node.content.trim().length) ||
      (node.type === 'element' && node.tagName.toLowerCase() === '!doctype') ||
      (node.type === 'element' && node.tagName.toLowerCase() === 'head')
    );
  });

export const extractFromBody = nodes =>
  nodes.reduce((result, element) => {
    if (['html', 'body'].includes(element.tagName)) {
      result.splice(result.length, 0, element.children);
    } else result.push(element);
    return result;
  }, []);

export const isValidReact = element =>
  React.isValidElement(element) ||
  (element instanceof Array && element.every(React.isValidElement));

export const extractIfOneChild = children =>
  children.length === 1 ? children[0] : children;

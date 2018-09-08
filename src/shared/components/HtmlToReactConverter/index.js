/* eslint-disable jest/no-disabled-tests, no-console */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose } from 'recompose';
import { parse } from 'himalaya';
import he from 'he';
import { camelCase, capitalize } from 'lodash';
import { withTheme } from 'emotion-theming';

import injectSlots from './injectSlots';
import { filter } from './filter';

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

const adaptNodes = nodes =>
  nodes.map(n => {
    if (n.children) n.children = adaptNodes(n.children);
    return adaptNode(n);
  });

const isValidReact = element =>
  React.isValidElement(element) ||
  (element instanceof Array && element.every(React.isValidElement));

const adaptChildren = array => {
  const filtered = array.filter(e => e);
  if (filtered.length > 1) return filtered;
  if (filtered.length === 1) return filtered[0];
  return null;
};

const parseAndAdapt = html => adaptNodes(parse(html));

class HtmlToReactConverter extends React.Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
    processors: PropTypes.arrayOf(PropTypes.shape({})),
    extraProps: PropTypes.shape({}),
    stores: PropTypes.shape({}).isRequired,
    theme: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    processors: [],
    extraProps: {},
  };

  constructor(props) {
    super(props);

    this.process = this.process.bind(this);
    this.handleNode = this.handleNode.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  process(element) {
    const { processors, extraProps, stores, theme } = this.props;
    let processed = element;
    let index = 0;

    do {
      const proc = processors[index];
      let isMatch;
      try {
        isMatch = proc.test(processed);
      } catch (e) {
        // ignore error
      }

      try {
        if (isMatch)
          processed = (proc.process || proc.converter)(processed, {
            extraProps,
            stores,
            theme,
          });
      } catch (e) {
        console.error(e);
        return processed;
      }
      index += 1;
    } while (
      index < processors.length &&
      processed &&
      typeof processed !== 'function' &&
      !isValidReact(processed)
    );

    return processed;
  }

  handleNode(element, index) {
    let { extraProps } = this.props;

    // Return nothing for Comment nodes
    if (!element || element.type === 'Comment') return null;

    // Return the content of Text nodes
    if (element.type === 'Text') {
      // debugger;
      return he.decode(element.content);
    }

    // If element is already a react element, return element.
    if (isValidReact(element)) return element;

    //
    // -------- At this moment, element.type = 'Element'

    if (element.tagName === 'head') return null;

    if (['!doctype', 'html', 'body'].includes(element.tagName)) {
      return element.children.map(this.handleNode);
    }

    //
    // -------- Element is ready to be processed

    const processed = this.process(element);

    const isReactElement = isValidReact(processed);
    const isFunction = typeof processed === 'function';

    if (isReactElement) {
      return <Fragment key={index}>{processed}</Fragment>;
    }

    // Process children before inserting them into the element
    const childrenProcessed = adaptChildren(
      element.children.map(this.handleNode),
    );

    if (isFunction) {
      return <Fragment key={index}>{processed(childrenProcessed)}</Fragment>;
    }

    // Removes extraProps for HTML components
    if (typeof processed.tagName !== 'function') extraProps = {};

    return (
      <processed.tagName
        {...filter(processed.attributes)}
        {...extraProps}
        key={index}
      >
        {childrenProcessed}
      </processed.tagName>
    );
  }

  render() {
    const { html, extraProps } = this.props;

    // window.performance.mark('parse');
    const htmlTree = parseAndAdapt(html);

    // window.performance.mark('inject');
    // window.performance.measure('🔥 h2r [parse]', 'parse', 'inject');
    injectSlots({ htmlTree, extraProps });

    // window.performance.mark('handle');
    // window.performance.measure('🔥 h2r [inject]', 'inject', 'handle');
    const toReturn = htmlTree.map(this.handleNode);

    // window.performance.mark('end');
    // window.performance.measure('🔥 h2r [handle]', 'handle', 'end');

    return toReturn;
  }
}

export default compose(
  withTheme,
  inject(({ stores }) => ({
    stores,
    processors: stores.theme.h2r.processorsByPriority,
  })),
)(HtmlToReactConverter);

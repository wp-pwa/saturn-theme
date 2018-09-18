/* eslint-disable jest/no-disabled-tests, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { compact } from 'lodash';
import parse from './parse';

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
    this.handleChildren = this.handleChildren.bind(this);
  }

  process(element) {
    const { processors, extraProps, stores, theme } = this.props;
    const { htmlTree } = this;

    const payload = {
      extraProps,
      stores,
      theme,
      htmlTree,
    };

    for (let i = 0; i < processors.length; i += 1) {
      const proc = processors[i];

      // Test processor function
      let isMatch = false;
      try {
        isMatch = proc.test(element, payload);
      } catch (e) {
        // ignore error
      }

      // Apply processor function
      if (isMatch) {
        try {
          // Do a shallow merge if element is different
          const processed = proc.process(element, payload);
          if (element !== processed) {
            Object.assign(element, processed);
          }
        } catch (e) {
          // Show error message and continue processing
          console.error(e);
        }
      }
    }
  }

  handleChildren(children) {
    if (!children) return null;

    for (let i = 0; i < children.length; i += 1) {
      children[i] = this.handleNode(children[i], i);
    }

    const compacted = compact(children);
    if (compacted.length > 1) return compacted;
    if (compacted.length === 1) return compacted[0];
    return null;
  }

  handleNode(element, index) {
    this.process(element);

    // Return nothing for 'comment' nodes
    if (!element || element.type === 'comment') return null;

    // Return the content of 'text' nodes
    if (element.type === 'text') return element.content;

    // Convert 'element' nodes to React
    return (
      <element.component {...element.props} key={index}>
        {this.handleChildren(element.children, element)}
      </element.component>
    );
  }

  render() {
    const { html } = this.props;
    const isBrowser = typeof window !== 'undefined';

    if (isBrowser) window.performance.mark('parse');
    this.htmlTree = parse(html);

    if (isBrowser) {
      window.performance.mark('handle');
      window.performance.measure('🔥 h2r [parse]', 'parse', 'handle');
    }

    const toReturn = this.handleChildren(this.htmlTree);

    if (isBrowser) {
      window.performance.mark('end');
      window.performance.measure('🔥 h2r [handle]', 'handle', 'end');
    }

    return toReturn;
  }
}

export default compose(
  withTheme,
  inject(({ stores }) => {
    const processors = stores.theme.h2r.processorsByPriority;
    return { stores, processors };
  }),
)(HtmlToReactConverter);

/* eslint-disable jest/no-disabled-tests, no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { compact } from 'lodash';
import parse from './parse';

class H2R extends Component {
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
    this.handleNodes = this.handleNodes.bind(this);
  }

  process(node) {
    const { processors, extraProps, stores, theme } = this.props;
    const { htmlTree } = this;

    const payload = { extraProps, stores, theme, htmlTree };

    for (let i = 0; i < processors.length; i += 1) {
      const proc = processors[i];

      // Test processor function
      let isMatch = false;
      try {
        isMatch = proc.test(node, payload);
      } catch (e) {
        // ignore error
      }

      // Apply processor function
      if (isMatch) {
        try {
          const processed = proc.process(node, payload);

          // Return true if was removed
          if (!processed) return true;

          // Do a shallow merge if node is different
          if (node !== processed) {
            Object.assign(node, processed);
          }
        } catch (e) {
          // Show error message and continue processing
          console.error(e);
        }
      }
    }

    // Return false if node was not removed
    return false;
  }

  handleNodes(nodes) {
    if (!nodes) return null;

    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i] = this.handleNode(nodes[i], i);
    }

    const compacted = compact(nodes);
    if (compacted.length > 1) return compacted;
    if (compacted.length === 1) return compacted[0];
    return null;
  }

  handleNode(node, index) {
    const isRemoved = this.process(node);

    // Return nothing for 'comment' nodes
    if (isRemoved || node.type === 'comment') return null;

    // Return the content of 'text' nodes
    if (node.type === 'text') return node.content;

    // Convert 'element' nodes to React
    return (
      <node.component {...node.props} key={index}>
        {this.handleNodes(node.children)}
      </node.component>
    );
  }

  render() {
    // const isBrowser = typeof window !== 'undefined';

    // if (isBrowser) {
    //   window.performance.mark('parse');
    // }

    this.htmlTree = parse(this.props.html);

    // if (isBrowser) {
    //   window.performance.mark('handle');
    //   window.performance.measure('🔥 h2r [parse]', 'parse', 'handle');
    // }

    const toReturn = this.handleNodes(this.htmlTree);

    // if (isBrowser) {
    //   window.performance.mark('end');
    //   window.performance.measure('🔥 h2r [handle]', 'handle', 'end');
    // }

    return toReturn;
  }
}

export default compose(
  withTheme,
  inject(({ stores }) => {
    const processors = stores.theme.h2r.processorsByPriority;
    return { stores, processors };
  }),
)(H2R);

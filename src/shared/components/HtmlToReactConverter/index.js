/* eslint-disable jest/no-disabled-tests, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose } from 'recompose';
import { withTheme } from 'emotion-theming';
import he from 'he';
import parseAndAdapt from './parseAndAdapt';

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

  shouldComponentUpdate() {
    return false;
  }

  process(element, parent) {
    const { processors, extraProps, stores, theme } = this.props;
    const { htmlTree } = this;

    const payload = {
      extraProps,
      stores,
      theme,
      htmlTree,
      parent,
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
          // Do a shallow merge
          Object.assign(element, proc.process(element, payload));
        } catch (e) {
          // Show error message and continue processing
          console.error(e);
        }
      }
    }
  }

  handleChildren(element) {
    const { children } = element;
    for (let i = 0; i < children.length; i += 1) {
      children.splice(i, 1, this.handleNode(children[i], i, element));
    }
    const filtered = children.filter(e => e);
    if (filtered.length > 1) return filtered;
    if (filtered.length === 1) return filtered[0];
    return null;
  }

  handleNode(element, index, parent) {
    this.process(element, parent);

    // Return nothing for Comment nodes
    if (!element || element.type === 'comment') return null;

    // Return the content of Text nodes
    if (element.type === 'text') return he.decode(element.content);

    // Add extraProps for React components
    const extraProps =
      typeof element.component === 'function' ? this.props.extraProps : {};

    return (
      <element.component {...element.props} {...extraProps} key={index}>
        {this.handleChildren(element)}
      </element.component>
    );
  }

  render() {
    const { html } = this.props;
    const isClient = typeof window !== 'undefined';

    if (isClient) window.performance.mark('parse');
    this.htmlTree = parseAndAdapt(html);

    if (isClient) {
      window.performance.mark('handle');
      window.performance.measure('🔥 h2r [parse]', 'parse', 'handle');
    }

    const toReturn = this.handleChildren({ children: this.htmlTree });

    if (isClient) {
      window.performance.mark('end');
      window.performance.measure('🔥 h2r [handle]', 'handle', 'end');
    }

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

/* eslint-disable jest/no-disabled-tests, no-console */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { parse } from 'himalaya';
import { withTheme } from 'emotion-theming';
import he from 'he';

import applyProcessors from './applyProcessors';
import applyConverters from './applyConverters';
import { filter } from './filter';

import {
  adaptNodes,
  removeEmptyNodes,
  isValidReact,
  extractIfOneChild,
} from './utils';

class HtmlToReactConverter extends React.Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
    theme: PropTypes.shape({}).isRequired,
    stores: PropTypes.shape({}).isRequired,
    processors: PropTypes.arrayOf(PropTypes.shape({})),
    converters: PropTypes.arrayOf(PropTypes.shape({})),
    extraProps: PropTypes.shape({}),
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    processors: [],
    converters: [],
    extraProps: {},
  };

  constructor(props) {
    super(props);

    const { extraProps, stores, theme } = props;
    this.payload = { extraProps, stores, theme };
    this.handleNode = this.handleNode.bind(this);
  }

  handleNode(element, index) {
    const { processors, converters } = this.props;

    // If element is a comment, return null.
    if (element.type === 'Comment') return null;

    // If element is just text, return its content.
    if (element.type === 'Text') return he.decode(element.content);

    // element.type === 'Element' = true

    if (element.tagName === 'head') {
      return null;
    }

    if (['!doctype', 'html', 'body'].includes(element.tagName)) {
      return element.children.map(this.handleNode);
    }

    // If element is a react element, return element.
    if (isValidReact(element)) return element;

    // Process element
    const eProcessed = applyProcessors(element, processors, this.payload);
    const eConverted = applyConverters(eProcessed, converters, this.payload);

    const { tagName, attributes, children } = eProcessed;

    // Removes extraProps for HTML components
    const extraProps =
      typeof tagName === 'function' ? this.payload.extraProps : {};

    if (eProcessed !== eConverted) {
      return (
        <Fragment key={index}>
          {typeof eConverted === 'function'
            ? eConverted(extractIfOneChild(children.map(this.handleNode)))
            : eConverted}
        </Fragment>
      );
    }
    return (
      <eProcessed.tagName {...filter(attributes)} {...extraProps} key={index}>
        {children && children.length > 0
          ? extractIfOneChild(children.map(this.handleNode))
          : null}
      </eProcessed.tagName>
    );
  }

  render() {
    const { html, render } = this.props;
    const htmlTree = adaptNodes(removeEmptyNodes(parse(html)));

    return render(htmlTree.map(this.handleNode));
  }
}

export default withTheme(
  inject(({ stores }) => ({ stores }))(HtmlToReactConverter),
);

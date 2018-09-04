/* eslint-disable jest/no-disabled-tests, no-console */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { parse } from 'himalaya';
import { withTheme } from 'emotion-theming';
import { flow } from 'lodash';
import he from 'he';

import injectSlots from './injectSlots';
import { filter } from './filter';

import { adaptNodes, isValidReact, extractIfOneChild } from './utils';

let callNumber = 0;
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
    this.transformToReact = this.transformToReact.bind(this);
    this.handleNode = this.handleNode.bind(this);
  }

  applyProcessor = (processed, { test, process }) => {
    try {
      return test(processed, this.payload)
        ? process(processed, this.payload)
        : processed;
    } catch (e) {
      return processed;
    }
  };

  applyProcessors = element => {
    const { processors } = this.props;
    return processors.reduce(this.applyProcessor, element);
  };

  applyConverters = element => {
    const { converters } = this.props;
    let match;
    try {
      match = converters.find(({ test }) => test(element));
    } catch (e) {
      return element;
    }

    try {
      return match ? match.converter(element, this.payload) : element;
    } catch (e) {
      console.error(e);
      return element;
    }
  };

  transformToReact = (element, index) => {
    // If element is a react element, return element.
    if (isValidReact(element)) return element;

    const { attributes, tagName, children } = element;

    return (
      <element.tagName
        key={index}
        {...filter(attributes)}
        {...(typeof tagName === 'function' ? this.payload.extraProps : {})}
      >
        {children && children.length > 0 ? extractIfOneChild(children) : null}
      </element.tagName>
    );
  };

  handleNode = (element, index) => {
    if (element.type === 'Text') return he.decode(element.content);

    // Process the element
    const eProcessed = this.applyProcessors(element);
    const { children } = eProcessed;

    // Convert if necessary
    const eConverted = this.applyConverters(eProcessed);
    const isConverted = eProcessed !== eConverted;

    if (isConverted) {
      return (
        <Fragment key={index}>
          {typeof eConverted === 'function'
            ? eConverted(
                <Fragment>
                  {extractIfOneChild(children.map(this.handleNode))}
                </Fragment>,
              )
            : eConverted}
        </Fragment>
      );
    }

    // Process and convert children before returning the processed element.
    if (children) eProcessed.children = children.map(this.handleNode);

    return this.transformToReact(eProcessed);
  };

  render() {
    const start = `start-render-${callNumber}`;
    const end = `end-render-${callNumber}`;

    const startHandle = `startHandle-render-${callNumber}`;
    const endHandle = `endHandle-render-${callNumber}`;

    callNumber += 1;

    window.performance.mark(start);

    const { html, render: renderProp } = this.props;

    // console.log(html);

    const htmlTree = flow(
      parse,
      adaptNodes,
    )(html);

    injectSlots({ htmlTree, extraProps: this.payload.extraProps });

    window.performance.mark(startHandle);
    const output = htmlTree.map(this.handleNode);
    window.performance.mark(endHandle);
    window.performance.measure(`🌚 H2R handleNode`, startHandle, endHandle);

    // console.log(output);

    const toReturn = renderProp(output);

    window.performance.mark(end);

    window.performance.measure(`🔥 H2R render`, start, end);
    return toReturn;
  }
}

export default withTheme(
  inject(({ stores }) => ({ stores }))(HtmlToReactConverter),
);

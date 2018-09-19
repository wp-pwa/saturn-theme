/* eslint-disable react/prop-types */
import React from 'react';
import renderer from 'react-test-renderer';
import { types } from 'mobx-state-tree';
import { Provider as MobxProvider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import H2R from '..';

// Test cases (h2r):
// without processors
// with a processor that test returns false
// with a processor that removes the node
// with a processor that changes component
// with a processor that changes component to React
// with a processor that adds/removes attributes
// with a processor that removes children
// with a processor that adds children
// with a processor that adds a node after it
// with a processor that uses extraProps
// with two or more processors
// with two or more processors (the first one fails while processing)
// with two or more processors that compete

const html = `
<!--This is a comment-->
<p id="paragraph">
  This is an html <span>example</span> for testing purposes.
</p>
<div class="hello">
  <img src="http://example.com/img.jpg">
</div>
`;

const ThemeStoreMock = types.model({
  h2r: types.optional(types.frozen, {
    processorsByPriority: [],
  }),
});

const renderH2R = (processors, extraProps = {}) => {
  const theme = ThemeStoreMock.create({
    h2r: { processorsByPriority: processors },
  });

  return renderer
    .create(
      <MobxProvider stores={{ theme }}>
        <ThemeProvider theme={{ color: 'red' }}>
          <H2R html={html} extraProps={extraProps} />
        </ThemeProvider>
      </MobxProvider>,
    )
    .toJSON();
};

describe('H2R', () => {
  test('without processors', () => {
    expect(renderH2R([])).toMatchSnapshot();
  });

  test('with a processor that test fails', () => {
    const testFail = {
      test: () => {
        throw Error("A processor's test has failed but nothing bad happened!");
      },
      process: () => ({ type: 'text', content: 'TEST HAS FAILED' }),
    };

    expect(renderH2R([testFail])).toMatchSnapshot();
  });

  test('with a processor that removes the node', () => {
    const removeImg = {
      test: ({ component }) => component === 'img',
      process: () => null,
    };

    expect(renderH2R([removeImg])).toMatchSnapshot();
  });

  test('with a processor that changes type', () => {
    const commentToText = {
      test: ({ type }) => type === 'comment',
      process: () => ({ type: 'text' }),
    };

    expect(renderH2R([commentToText])).toMatchSnapshot();
  });

  test('with a processor that changes component', () => {
    const toBlockquote = {
      test: ({ props }) => props.id === 'paragraph',
      process: () => ({ component: 'blockquote' }),
    };

    expect(renderH2R([toBlockquote])).toMatchSnapshot();
  });

  test('with a processor that changes component to React', () => {
    const Blockquote = ({ id, children }) => (
      <div id={id}>
        This is a React component
        <blockquote>{children}</blockquote>
      </div>
    );

    const toBlockquote = {
      test: ({ props }) => props.id === 'paragraph',
      process: () => ({ component: Blockquote }),
    };

    expect(renderH2R([toBlockquote])).toMatchSnapshot();
  });

  test('with a processor that adds/removes attributes', () => {
    const idToClassName = {
      test: ({ props }) => props.id === 'paragraph',
      process: ({ props }) => ({ props: { className: props.id } }),
    };

    expect(renderH2R([idToClassName])).toMatchSnapshot();
  });

  test('with a processor that removes children', () => {
    const removeChildren = {
      test: ({ props }) =>
        props.id === 'paragraph' || props.className === 'hello',
      process: () => ({ children: null }),
    };

    expect(renderH2R([removeChildren])).toMatchSnapshot();
  });

  test('with a processor that adds a node after it', () => {
    const addNextNode = {
      test: ({ component }) => component === 'span',
      process: node => {
        const { children } = node.parent;
        const index = children.indexOf(node);
        children.splice(index + 1, 0, { type: 'text', content: ' code ' });
        return node;
      },
    };

    expect(renderH2R([addNextNode])).toMatchSnapshot();
  });

  test('with a processor that uses extraProps', () => {
    const idToClassName = {
      test: ({ props }) => props.id === 'paragraph',
      process: (_, { extraProps }) => ({ props: { id: extraProps.newId } }),
    };

    expect(renderH2R([idToClassName], { newId: 'test' })).toMatchSnapshot();
  });

  test('with two or more processors', () => {
    const commentToText = {
      test: ({ type }) => type === 'comment',
      process: () => ({ type: 'text' }),
    };

    const toBlockquote = {
      test: ({ props }) => props.id === 'paragraph',
      process: () => ({ component: 'blockquote' }),
    };

    const removeImg = {
      test: ({ component }) => component === 'img',
      process: () => null,
    };

    expect(
      renderH2R([commentToText, toBlockquote, removeImg]),
    ).toMatchSnapshot();
  });

  test('with two or more processors (the first one fails while processing)', () => {
    const processFails = {
      test: ({ props }) => props.id === 'paragraph',
      process: () => {
        throw Error('A processor has failed but nothing bad happened!');
      },
    };

    const toBlockquote = {
      test: ({ props }) => props.id === 'paragraph',
      process: () => ({ component: 'blockquote' }),
    };

    expect(renderH2R([processFails, toBlockquote])).toMatchSnapshot();
  });

  test('with two or more processors that try to change the same node', () => {
    const toFigure = {
      test: ({ props }) => props.id === 'paragraph',
      process: ({ props, ...others }) => ({
        component: 'figure',
        props: {},
        children: [
          {
            type: 'element',
            component: 'img',
            src: 'https://example.com/test.png',
          },
          { ...others },
        ],
      }),
    };

    const toBlockquote = {
      test: ({ props }) => props.id === 'paragraph',
      process: () => ({ component: 'blockquote' }),
    };

    expect(renderH2R([toFigure, toBlockquote])).toMatchSnapshot();
  });
});

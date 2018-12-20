import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class SameHeight extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  static heights = {};

  constructor() {
    super();

    this.container = React.createRef();
  }

  componentDidUpdate() {
    const { id } = this.props;
    const { current: container } = this.container;

    if (id && container) {
      SameHeight.heights[id] = container.offsetHeight;
    }
  }

  componentWillUnmount() {
    const { id } = this.props;
    const { current: container } = this.container;

    if (id && container) {
      const height = container.offsetHeight;
      SameHeight.heights[id] = Math.max(
        SameHeight.heights[id] || 0,
        height || 0,
      );
    }
  }

  render() {
    return (
      <Container
        className={this.props.className}
        minHeight={SameHeight.heights[this.props.id]}
        ref={this.container}
      >
        {this.props.children}
      </Container>
    );
  }
}

export default SameHeight;

const Container = styled.div`
  ${({ minHeight }) =>
    typeof minHeight === 'number' ? `min-height: ${minHeight}px;` : ''};
  display: flex;
  flex-direction: column;

  & > .LazyLoad {
    flex: 1;
    display: flex;
    flex-direction: column;

    & > div {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
`;

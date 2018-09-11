import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import Icon from '../../../shared/components/Icons/Share';

class SharedCount extends Component {
  componentDidMount() {
    const { isReady, isSelected, requestCount } = this.props;

    if (!isReady && isSelected) {
      setTimeout(() => requestCount(), 500);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.isSelected !== nextProps.isSelected ||
      this.props.isReady !== nextProps.isReady
    );
  }

  componentDidUpdate(prevProps) {
    const { isReady, isSelected, requestCount } = this.props;

    if (!isReady && isSelected && !prevProps.isSelected) {
      setTimeout(() => requestCount(), 500);
    }
  }

  render() {
    const { isReady, counts } = this.props;

    return (
      <Container ready={isReady}>
        <Icon size={18} />
        <Text>{counts}</Text>
      </Container>
    );
  }
}

SharedCount.propTypes = {
  requestCount: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
  counts: PropTypes.number,
};

SharedCount.defaultProps = {
  counts: null,
};

export default inject(({ stores: { connection, theme } }, { type, id }) => {
  const counts = theme.share.all.count({ type, id });

  return {
    requestCount: () => theme.share.all.requestCount({ type, id }),
    isSelected: connection.selectedContext.getItem({ item: { type, id } })
      .isSelected,
    isReady: counts !== null,
    counts,
  };
})(SharedCount);

const Container = styled.div`
  margin: 0;
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  transition: opacity ${({ theme }) => theme.transitionTime};
  opacity: ${({ ready }) => (ready ? 1 : 0)};
  will-change: opacity;
`;

const Text = styled.span`
  font-weight: 300;
  font-size: 0.9rem;
  padding-left: 5px;
`;

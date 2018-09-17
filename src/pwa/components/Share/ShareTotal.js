import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const ShareTotal = ({ isReady, total, shares }) => (
  <Container isReady={isReady}>
    <Total>{total}</Total>
    <Text>{shares}</Text>
  </Container>
);

ShareTotal.propTypes = {
  isReady: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  shares: PropTypes.string.isRequired,
};

export default inject(({ stores: { theme } }) => {
  const total = theme.share.all.count(theme.shareModal.item);

  return {
    total: total || 0,
    isReady: typeof total === 'number',
    shares: theme.lang.getShares(total),
  };
})(ShareTotal);

const getTime = ({ theme }) => theme.transitionTime;

const Container = styled.div`
  filter: opacity(${({ isReady }) => (isReady ? 100 : 0)}%);
  transition: filter ${getTime} ease ${getTime};
  padding-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: opacity;
`;

const Total = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

const Text = styled.span`
  font-size: 1.2rem;
  padding-left: 5px;
`;

import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const Counter = ({ counts, shares }) =>
  counts ? (
    <Container>
      <Value key="value">{counts}</Value>
      <Text key="text">{shares}</Text>
    </Container>
  ) : null;

Counter.propTypes = {
  counts: PropTypes.number,
  shares: PropTypes.string.isRequired,
};

Counter.defaultProps = {
  counts: 0,
};

export default inject(({ theme }, { network }) => {
  const counts = theme.share[network].count(theme.shareModal.item);
  return {
    counts,
    shares: theme.lang.getShares(counts),
  };
})(Counter);

const Container = styled.div`
  flex: 10 1 auto;
  margin-left: 12px;
  padding-top: 8px;
`;

const Value = styled.span`
  color: #363636;
  font-weight: bold;
  font-size: 16px;
  padding-right: 5px;
`;

const Text = styled.span`
  font-size: 13px;
`;

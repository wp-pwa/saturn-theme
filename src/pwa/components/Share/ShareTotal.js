import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as selectors from '../../selectors';

const ShareTotal = ({ isReady, total }) =>
  <Container isReady={isReady}>
    <Total>
      {total}
    </Total>
    <Text>
      {'Compartidos'}
    </Text>
  </Container>;

ShareTotal.propTypes = {
  isReady: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  isReady: selectors.shareModal.areCurrentCountsReady(state),
  total: selectors.shareModal.getCurrentTotalCounts(state)
});

export default connect(mapStateToProps)(ShareTotal);

const Container = styled.div`
  filter: opacity(${({ isReady }) => (isReady ? 100 : 0)}%);
  transition: filter 0.3s ease 0.3s;
  padding-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Total = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

const Text = styled.span`
  font-size: 1.2rem;
  padding-left: 5px;
`;

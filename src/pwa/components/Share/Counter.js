import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as selectors from '../../selectors';

const Counter = ({ counts }) =>
  counts ? (
    <Container>
      <Value key="value">{counts}</Value>
      <Text key="text">Compartidos</Text>
    </Container>
  ) : null;

Counter.propTypes = {
  counts: PropTypes.number,
};

Counter.defaultProps = {
  counts: 0,
};

const mapStateToProps = (state, { method }) => ({
  counts: selectors.share.getCurrentCounts(state)[method],
});

export default connect(mapStateToProps)(Counter);

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

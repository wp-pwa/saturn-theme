import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Icon from 'react-icons/lib/md/share';
import * as selectorCreators from '../../../pwa/selectorCreators';

const SharedCount = ({ ready, total }) => (
  <Container isTotalReady={ready}>
    <Icon size={18} verticalAlign="none" />
    <Text>{`${total} compartidos`}</Text>
  </Container>
);

SharedCount.propTypes = {
  ready: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  ready: selectorCreators.share.areCountsReady(id)(state),
  total: selectorCreators.share.getTotalCounts(id)(state),
});

export default connect(mapStateToProps)(SharedCount);

const Container = styled.p`
  margin: 0;
  padding: 5px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  transition: opacity 0.3s;
  opacity: ${({ isTotalReady }) => (isTotalReady ? 1 : 0)};
`;

const Text = styled.span`
  font-weight: 300;
  font-size: 0.9rem;
  padding-left: 5px;
`;

import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Media from '../../../shared/components/Media';
import Spinner from '../../elements/Spinner';
import * as selectors from '../../selectors';
import * as selectorCreators from '../../selectorCreators';

const Picture = ({ id, ready }) =>
  ready ? (
    <Container>
      <Placeholder />
      <Media id={id} height="100%" width="100%" objectFit="contain" />
    </Container>
  ) : (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );

Picture.propTypes = {
  id: PropTypes.number.isRequired,
  ready: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  shareReady: selectorCreators.share.areCountsReady(id)(state),
  lists: selectors.list.getLists(state),
});

export default connect(mapStateToProps)(
  inject(({ connection }, { id }) => ({
    ready: connection.single.media[id] && connection.single.media[id].ready,
  }))(Picture),
);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
  background: #0e0e0e;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.heights.bar});
`;

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.heights.bar};
  background-color: ${({ theme }) => theme.colors.background};
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

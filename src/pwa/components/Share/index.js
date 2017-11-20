/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-danger,  no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Transition from 'react-transition-group/Transition';
import * as selectors from '../../selectors';
import * as actions from '../../actions';
import ShareHeader from './ShareHeader';
import ShareBody from './ShareBody';

const ShareContainer = ({
  isOpen,
  shareModalOpeningStarted,
  shareModalOpeningFinished,
  shareModalClosingRequested,
  shareModalClosingStarted,
  shareModalClosingFinished,
}) => (
  <Transition
    in={isOpen}
    timeout={300}
    mountOnEnter
    unmountOnExit
    onEnter={node => node.scrollTop}
    onEntering={shareModalOpeningStarted}
    onEntered={shareModalOpeningFinished}
    onExiting={shareModalClosingStarted}
    onExited={shareModalClosingFinished}
  >
    {status => (
      <Container>
        <Overlay status={status} onClick={shareModalClosingRequested} />
        <InnerContainer status={status}>
          <ShareHeader />
          <ShareBody />
        </InnerContainer>
      </Container>
    )}
  </Transition>
);

ShareContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  shareModalOpeningStarted: PropTypes.func.isRequired,
  shareModalOpeningFinished: PropTypes.func.isRequired,
  shareModalClosingRequested: PropTypes.func.isRequired,
  shareModalClosingStarted: PropTypes.func.isRequired,
  shareModalClosingFinished: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isOpen: selectors.shareModal.isOpen(state),
});

const mapDispatchToProps = dispatch => ({
  shareModalOpeningStarted: payload => dispatch(actions.shareModal.openingStarted(payload)),
  shareModalOpeningFinished: payload => dispatch(actions.shareModal.openingFinished(payload)),
  shareModalClosingRequested: () => dispatch(actions.shareModal.closingRequested()),
  shareModalClosingStarted: payload => dispatch(actions.shareModal.closingStarted(payload)),
  shareModalClosingFinished: payload => dispatch(actions.shareModal.closingFinished(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareContainer);

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: ${({ status }) => status.startsWith('enter') ? 'opacity(50%)' : 'opacity(0%)'};
  transition: filter 300ms ease-out;
  background-color: #000;
`;

const InnerContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  transform: ${({ status }) => (status.startsWith('enter') ? 'translateY(0%)' : 'translateY(100%)')};
  transition: transform 300ms ease-out;
`;

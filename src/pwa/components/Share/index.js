import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Transition from 'react-transition-group/Transition';
import ShareTotal from './ShareTotal';
import ShareClose from './ShareClose';
import SharePreview from './SharePreview';
import ShareList from './ShareList';
import { ShareBody, ShareHeader } from '../../../shared/styled/Share';

const ShareContainer = ({
  isOpen,
  close,
  // shareModalOpeningStarted,
  // shareModalOpeningFinished,
  // shareModalClosingStarted,
  // shareModalClosingFinished,
}) => (
  <Transition
    in={isOpen}
    timeout={300}
    mountOnEnter
    unmountOnExit
    onEnter={node => node.scrollTop}
    // onEntering={shareModalOpeningStarted}
    // onEntered={shareModalOpeningFinished}
    // onExiting={shareModalClosingStarted}
    // onExited={shareModalClosingFinished}
  >
    {status => (
      <Container>
        <Overlay status={status} onClick={close} />
        <InnerContainer status={status}>
          <ShareHeader>
            <ShareTotal />
            <ShareClose />
          </ShareHeader>
          <ShareBody>
            <SharePreview />
            <ShareList />
          </ShareBody>
        </InnerContainer>
      </Container>
    )}
  </Transition>
);

ShareContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  // shareModalOpeningStarted: PropTypes.func.isRequired,
  // shareModalOpeningFinished: PropTypes.func.isRequired,
  // shareModalClosingStarted: PropTypes.func.isRequired,
  // shareModalClosingFinished: PropTypes.func.isRequired,
};

// const mapDispatchToProps = dispatch => ({
//   shareModalOpeningStarted: payload => dispatch(actions.share.openingStarted(payload)),
//   shareModalOpeningFinished: payload => dispatch(actions.share.openingFinished(payload)),
//   shareModalClosingStarted: payload => dispatch(actions.share.closingStarted(payload)),
//   shareModalClosingFinished: payload => dispatch(actions.share.closingFinished(payload)),
// });

export default inject(({ theme }) => ({
  isOpen: theme.shareModal.isOpen,
  close: theme.shareModal.close,
}))(ShareContainer);

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
  filter: ${({ status }) => (status.startsWith('enter') ? 'opacity(50%)' : 'opacity(0%)')};
  transition: filter 300ms ease-out;
  background-color: #000;
`;

const InnerContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  transform: ${({ status }) =>
    status.startsWith('enter') ? 'translateY(0%)' : 'translateY(100%)'};
  transition: transform 300ms ease-out;
`;

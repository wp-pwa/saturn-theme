import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Transition from 'react-transition-group/Transition';
import ShareTotal from './ShareTotal';
import ShareClose from './ShareClose';
import SharePreview from './SharePreview';
import ShareCopy from './ShareCopy';
import ShareButton from './ShareButton';
import {
  ShareBody,
  ShareHeader,
  ShareList,
} from '../../../shared/styled/Share';

const networks = [
  'facebook',
  'twitter',
  'whatsapp',
  'telegram',
  'pinterest',
  'linkedin',
  'googlePlus',
  'email',
];

const ShareContainer = ({ isOpen, close }) => (
  <Transition
    in={isOpen}
    timeout={300}
    mountOnEnter
    unmountOnExit
    onEnter={node => node.scrollTop}
  >
    {status => (
      <Fragment>
        <Overlay status={status} onClick={close} />
        <Container status={status}>
          <ShareHeader>
            <ShareTotal />
            <ShareClose />
          </ShareHeader>
          <ShareBody>
            <SharePreview />
            <ShareList>
              <ShareCopy />
              {networks.map(net => <ShareButton key={net} network={net} />)}
            </ShareList>
          </ShareBody>
        </Container>
      </Fragment>
    )}
  </Transition>
);

ShareContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default inject(({ stores: { theme } }) => ({
  isOpen: theme.shareModal.isOpen,
  close: theme.shareModal.close,
}))(ShareContainer);

const transitionCurve = ({ status }) =>
  status.startsWith('enter') ? 'ease-out' : 'ease-in';

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 100%;
  transform: ${({ status }) =>
    status.startsWith('enter') ? 'translateY(0)' : 'translateY(100%)'};
  filter: ${({ status }) =>
    status.startsWith('enter') ? 'opacity(50%)' : 'opacity(0%)'};
  transition: filter ${({ theme }) => theme.transitionTime} ease-out,
    ${({ status, theme }) =>
      status.startsWith('enter')
        ? 'transform 0ms'
        : `transform 0ms ease ${theme.transitionTime}`};
  background-color: #000;
  will-change: transform, opacity;
  z-index: 100;
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  transform: ${({ status }) =>
    status.startsWith('enter') ? 'translateY(0%)' : 'translateY(100%)'};
  transition: transform ${({ theme }) => theme.transitionTime}
    ${transitionCurve};
  will-change: transform;
  z-index: 101;
`;

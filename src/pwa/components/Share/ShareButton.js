import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import ShareCounter from './ShareCounter';
import ShareIcon from './ShareIcon';
import { ButtonContainer } from '../../../shared/styled/Share';

const ShareButton = ({ network, shareUrl, shareText }) => (
  <ButtonContainer>
    <ButtonWrapper>
      <StyledButton target="_blank" href={shareUrl}>
        <ShareIcon network={network} />
        <ShareCounter network={network} />
        <ShareBadge network={network}>{shareText}</ShareBadge>
      </StyledButton>
    </ButtonWrapper>
  </ButtonContainer>
);

ShareButton.propTypes = {
  network: PropTypes.string.isRequired,
  shareUrl: PropTypes.string.isRequired,
  shareText: PropTypes.string.isRequired,
};

// WARNING - before using just mobx-state-tree, events
//           were sent together with the redux actions.
//           See /pwa/actions/share.linkShared

export default inject(({ theme }, { network }) => ({
  shareUrl: theme.share[network] && theme.share[network].url(theme.shareModal.item),
  shareText: theme.lang.get('share'),
}))(ShareButton);

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.a`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: inline-flex;
  justify-content: space-between;
  background: transparent;
  overflow: hidden;
  outline: none;

  &:hover,
  &:focus {
    background: transparent;
  }
`;

const ShareBadge = styled.div`
  flex: 0 0 auto;
  border-radius: 3px;
  box-sizing: content-box;
  color: #ffffff;
  position: relative;
  padding: 0 10px;
  min-width: 80px;
  margin: 7px 0;
  height: 26px;
  text-align: center;
  font-size: 0.75em;
  line-height: 26px;
  text-transform: uppercase;
  background-color: ${({ theme, network }) => theme.colors[network] || theme.colors.copy};
`;

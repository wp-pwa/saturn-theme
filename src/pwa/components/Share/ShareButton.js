import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import ShareCounter from './ShareCounter';
import ShareIcon from './ShareIcon';
import { ButtonContainer, ShareBadge } from '../../../shared/styled/Share';

const ShareButton = ({ network, shareUrl, shareText }) => (
  <ShareLink target="_blank" href={shareUrl}>
    <ButtonContainer>
      <ShareIcon network={network} />
      <ShareCounter network={network} />
      <ShareBadge network={network}>{shareText}</ShareBadge>
    </ButtonContainer>
  </ShareLink>
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

const ShareLink = styled.a`
  display: block;
`;

import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import ShareCounter from './ShareCounter';
import ShareIcon from './ShareIcon';
import { ButtonContainer, ShareBadge } from '../../../shared/styled/Share';

const ShareButton = ({ network, url, text, sendEvent }) => (
  <ShareLink target="_blank" href={url} onClick={() => sendEvent({
    label: `method: ${network}`,
    category: 'Share modal',
    action: 'share',
  })}>
    <ButtonContainer>
      <ShareIcon network={network} />
      <ShareCounter network={network} />
      <ShareBadge network={network}>{text}</ShareBadge>
    </ButtonContainer>
  </ShareLink>
);

ShareButton.propTypes = {
  network: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  sendEvent: PropTypes.func.isRequired,
};

const extraParams = (net, entity) => {
  if (net === 'facebook') return { quote: entity.title };
  if (net === 'twitter') return { text: entity.title };
  if (net === 'whatsapp') return { text: entity.title };
  if (net === 'telegram') return { text: entity.title };
  if (net === 'linkedin') return { title: entity.title, summary: entity.title };
  if (net === 'email') return { subject: entity.title, body: entity.title };
  if (net === 'pinterest')
    return {
      media: entity.type === 'media' ? entity.original.url : entity.media.featured.original.url,
      description: entity.title,
    };
  return {};
};

export default inject(({ stores: { connection, theme, analytics } }, { network }) => {
  const { type, id } = theme.shareModal.item;
  const entity = connection.entity(type, id);
  return {
    url:
      theme.share[network] &&
      theme.share[network].url({ type, id, ...extraParams(network, entity) }),
    text: theme.lang.get('share'),
    sendEvent: analytics.sendEvent,
  };
})(ShareButton);

const ShareLink = styled.a`
  display: block;
`;

/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import ShareIcon from 'react-icons/lib/md/share';
import EmailIcon from 'react-icons/lib/fa/envelope-o';
import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import WhatsappIcon from 'react-icons/lib/fa/whatsapp';

// WARNING - before using just mobx-state-tree, these events
//           were sent together with the redux events payload:
//
// event: { network: 'facebook', component: 'Share bar' }
// event: { network: 'twitter', component: 'Share bar' }
// event: { network: 'whatsapp', component: 'Share bar' }
// event: { network: 'email', component: 'Share bar' }
// ...
// actions.share.openingRequested({
//   id,
//   wpType: type,
//   component: 'Share bar',
// }),

const Shares = ({ openModal, facebookUrl, twitterUrl, whatsappUrl, emailUrl }) => (
  <Container>
    <FacebookShareLink target="_blank" href={facebookUrl}>
      <FacebookIcon size={28} />
    </FacebookShareLink>
    <TwitterShareLink target="_blank" href={twitterUrl}>
      <TwitterIcon size={30} />
    </TwitterShareLink>
    <WhatsappShareLink target="_blank" href={whatsappUrl}>
      <WhatsappIcon size={30} />
    </WhatsappShareLink>
    <EmailWrapper>
      <EmailShareLink target="_blank" href={emailUrl}>
        <EmailIcon size={28} />
      </EmailShareLink>
    </EmailWrapper>
    <ShareLink onClick={openModal}>
      <ShareIcon size={28} />
    </ShareLink>
  </Container>
);

Shares.propTypes = {
  facebookUrl: PropTypes.string.isRequired,
  twitterUrl: PropTypes.string.isRequired,
  whatsappUrl: PropTypes.string.isRequired,
  emailUrl: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default inject(({ connection, theme }) => {
  const { type, id, title, excerpt } = connection.selectedItem.entity;
  return {
    facebookUrl: theme.share.facebook.url({ type, id, quote: title }),
    twitterUrl: theme.share.twitter.url({ type, id, text: title }),
    whatsappUrl: theme.share.whatsapp.url({ type, id, text: title }),
    emailUrl: theme.share.email.url({ type, id, subject: title, body: excerpt }),
    openModal: theme.shareModal.open,
  };
})(Shares);

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100vw - 130px);
  display: flex;
  height: ${({ theme }) => theme.heights.bar};
  flex-grow: 1;

  & > div {
    color: ${({ theme }) => theme.colors.white};
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ theme }) => theme.heights.bar};
  }
`;

const EmailWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const FacebookShareLink = styled.a`
  background-color: ${({ theme }) => theme.colors.facebook};
`;

const TwitterShareLink = styled.a`
  background-color: ${({ theme }) => theme.colors.twitter};
`;

const WhatsappShareLink = styled.a`
  background-color: ${({ theme }) => theme.colors.whatsapp};
`;

const EmailShareLink = styled.a`
  background-color: ${({ theme }) => theme.colors.email};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShareLink = styled.div`
  background-color: ${({ theme }) => theme.colors.share};
`;

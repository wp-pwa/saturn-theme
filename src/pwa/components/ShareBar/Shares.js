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
import ShareButton from '../ShareButton';

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

const Shares = ({
  type,
  id,
  facebookUrl,
  twitterUrl,
  whatsappUrl,
  emailUrl,
}) => (
  <Container>
    <Box color="facebook">
      <ShareLink target="_blank" href={facebookUrl}>
        <FacebookIcon size={26} />
      </ShareLink>
    </Box>
    <Box color="twitter">
      <ShareLink target="_blank" href={twitterUrl}>
        <TwitterIcon size={28} />
      </ShareLink>
    </Box>
    <Box color="whatsapp">
      <ShareLink target="_blank" href={whatsappUrl}>
        <WhatsappIcon size={28} />
      </ShareLink>
    </Box>
    <Box color="email">
      <ShareLink target="_blank" href={emailUrl}>
        <EmailIcon size={26} />
      </ShareLink>
    </Box>
    <Box color="share">
      <ShareButton type={type} id={id}>
        <ShareIcon size={26} />
      </ShareButton>
    </Box>
  </Container>
);

Shares.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  facebookUrl: PropTypes.string.isRequired,
  twitterUrl: PropTypes.string.isRequired,
  whatsappUrl: PropTypes.string.isRequired,
  emailUrl: PropTypes.string.isRequired,
};

export default inject(({ stores: { connection, theme } }) => {
  const { type, id, title, excerpt } = connection.selectedItem.entity;
  return {
    type,
    id,
    facebookUrl: theme.share.facebook.url({ type, id, quote: title }),
    twitterUrl: theme.share.twitter.url({ type, id, text: title }),
    whatsappUrl: theme.share.whatsapp.url({ type, id, text: title }),
    emailUrl: theme.share.email.url({
      type,
      id,
      subject: title,
      body: excerpt,
    }),
  };
})(Shares);

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100vw - 130px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: ${({ theme }) => theme.heights.bar};
  flex-grow: 1;

  & > div {
    height: 42px;
    width: 42px;
    padding: 2px;
    flex-grow: 0;
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Box = styled.div`
  & > * {
    background-color: ${({ theme, color }) => theme.colors[color]};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
`;

const ShareLink = styled.a`
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;

  &,
  &:visited,
  &:active {
    color: white;
  }
`;

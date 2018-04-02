import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { ShareButtons } from 'react-share';
import ShareIcon from 'react-icons/lib/md/share';
import EmailIcon from 'react-icons/lib/fa/envelope-o';
import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import WhatsappIcon from 'react-icons/lib/fa/whatsapp';
import * as actions from '../../actions';

const {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
} = ShareButtons;

const Shares = ({ link, title, shareModalOpeningRequested, linkShared }) => (
  <Container>
    <StyledFacebookShareButton
      url={link}
      quote={title}
      onClick={() => linkShared({ network: 'facebook', component: 'Share bar' })}
    >
      <FacebookIcon size={28} />
    </StyledFacebookShareButton>
    <StyledTwitterShareButton
      url={link}
      title={title}
      onClick={() => linkShared({ network: 'twitter', component: 'Share bar' })}
    >
      <TwitterIcon size={30} />
    </StyledTwitterShareButton>
    <StyledWhatsappShareButton
      url={link}
      title={title}
      onClick={() => linkShared({ network: 'whatsapp', component: 'Share bar' })}
    >
      <WhatsappIcon size={30} />
    </StyledWhatsappShareButton>
    <StyledEmailShareButton
      url={link}
      subject={title}
      onClick={() => linkShared({ network: 'email', component: 'Share bar' })}
    >
      <EmailIcon size={28} />
    </StyledEmailShareButton>
    <ShareButton onClick={shareModalOpeningRequested}>
      <ShareIcon size={28} />
    </ShareButton>
  </Container>
);

Shares.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  shareModalOpeningRequested: PropTypes.func.isRequired,
  linkShared: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, { id, type }) => ({
  shareModalOpeningRequested: () =>
    dispatch(
      actions.share.openingRequested({
        id,
        wpType: type,
        component: 'Share bar',
      }),
    ),
  linkShared: payload => dispatch(actions.share.linkShared(payload)),
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ connection }) => ({
    title: connection.selectedItem.entity.title,
    link: connection.selectedItem.entity.link,
  })),
)(Shares);

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

const StyledFacebookShareButton = styled(FacebookShareButton)`
  background-color: ${({ theme }) => theme.colors.facebook};
`;

const StyledTwitterShareButton = styled(TwitterShareButton)`
  background-color: ${({ theme }) => theme.colors.twitter};
`;

const StyledWhatsappShareButton = styled(WhatsappShareButton)`
  background-color: ${({ theme }) => theme.colors.whatsapp};
`;

const StyledEmailShareButton = styled(EmailShareButton)`
  background-color: ${({ theme }) => theme.colors.email};
`;

const ShareButton = styled.div`
  background-color: ${({ theme }) => theme.colors.share};
`;

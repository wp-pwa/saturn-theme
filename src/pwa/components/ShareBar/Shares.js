import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { ShareButtons, generateShareIcon } from 'react-share';
import ShareIcon from 'react-icons/lib/md/share';
import * as actions from '../../actions';

const {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const WhatsappIcon = generateShareIcon('whatsapp');
const TwitterIcon = generateShareIcon('twitter');
const EmailIcon = generateShareIcon('email');

const Shares = ({ link, title, shareModalOpeningRequested }) => (
  <Container>
    <StyledWhatsappShareButton url={link} title={title}>
      <WhatsappIcon size={40} />
    </StyledWhatsappShareButton>
    <StyledFacebookShareButton url={link} quote={title}>
      <FacebookIcon size={40} />
    </StyledFacebookShareButton>
    <StyledTwitterShareButton url={link} title={title}>
      <TwitterIcon size={40} />
    </StyledTwitterShareButton>
    <StyledEmailShareButton url={link} subject={title}>
      <EmailIcon size={40} />
    </StyledEmailShareButton>
    <ShareButton onClick={shareModalOpeningRequested}>
      <StyledShareIcon size={22} />
    </ShareButton>
  </Container>
);

Shares.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  shareModalOpeningRequested: PropTypes.func.isRequired
};

Shares.defaultProps = {
  title: null,
  link: null
};

const mapDispatchToProps = (dispatch, props) => ({
  shareModalOpeningRequested: () =>
    dispatch(
      actions.share.openingRequested({
        id: props.id,
        wpType: `${props.type}s`
      })
    )
});

export default connect(null, mapDispatchToProps)(Shares);

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  height: ${({ theme }) => theme.shareBarHeight};
  flex-grow: 1;

  & > div {
    flex-grow: 1;
    width: auto;
  }
`;

const StyledWhatsappShareButton = styled(WhatsappShareButton)`
  padding: 0 !important;
  margin: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(44, 183, 66);
  width: ${({ theme }) => theme.shareBarButtonSize};
`;

const StyledFacebookShareButton = styled(FacebookShareButton)`
  padding: 0 !important;
  margin: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(59, 89, 152);
  width: ${({ theme }) => theme.shareBarButtonSize};
`;

const StyledTwitterShareButton = styled(TwitterShareButton)`
  padding: 0 !important;
  margin: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 172, 237);
  width: ${({ theme }) => theme.shareBarButtonSize};
`;

const StyledEmailShareButton = styled(EmailShareButton)`
  padding: 0 !important;
  margin: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(127, 127, 127);
  width: ${({ theme }) => theme.shareBarButtonSize};
`;

const ShareButton = styled.div`
  padding: 0;
  margin: 0;
  background: none;
  width: ${({ theme }) => theme.shareBarButtonSize};
  height: ${({ theme }) => theme.shareBarHeight};
  box-sizing: border-box;
  background: #006ca0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledShareIcon = styled(ShareIcon)`
  fill: white;
  margin: 9px;
`;

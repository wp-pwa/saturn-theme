import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ShareButtons, generateShareIcon } from 'react-share';
import EmailIcon from 'react-icons/lib/fa/envelope';
import ShareIcon from 'react-icons/lib/md/share';
import styled from 'styled-components';
import NextButton from './NextButton';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

const { FacebookShareButton, WhatsappShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const WhatsappIcon = generateShareIcon('whatsapp');
const TwitterIcon = generateShareIcon('twitter');

class ShareBar extends Component {
  handleShareModalOpening = () =>
    this.props.shareModalOpeningRequested({ id: this.props.id, wpType: `${this.props.type}s` });

  render() {
    const { hiddenBars, title, link } = this.props;
    const email = `mailto:?body=${encodeURIComponent(`${title}\n${link}`)}`;

    return (
      <Container isHidden={hiddenBars}>
        <StyledWhatsappShareButton url={link} title={title}>
          <WhatsappIcon size={40} round />
        </StyledWhatsappShareButton>
        <StyledFacebookShareButton url={link} title={title}>
          <FacebookIcon size={40} round />
        </StyledFacebookShareButton>
        <StyledTwitterShareButton url={link} title={title}>
          <TwitterIcon size={40} round />
        </StyledTwitterShareButton>
        <EmailShareButton>
          <a href={email}>
            <StyledEmailIcon size={20} />
          </a>
        </EmailShareButton>
        <ShareButton onClick={this.handleShareModalOpening}>
          <StyledShareIcon size={22} />
        </ShareButton>
        <NextButton />
      </Container>
    );
  }
}

ShareBar.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  shareModalOpeningRequested: PropTypes.func.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  id: selectors.shareBar.getId(state),
  type: selectors.shareBar.getType(state),
  title: selectors.shareBar.getTitle(state),
  link: selectors.shareBar.getLink(state),
  hiddenBars: selectors.post.getHiddenBars(state),
});

const mapDispatchToProps = dispatch => ({
  shareModalOpeningRequested: payload => dispatch(actions.shareModal.openingRequested(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareBar);

const Container = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  transform: translateY(${({ theme, isHidden }) => (isHidden ? theme.shareBarHeight : 0)});
  left: 0;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  height: ${({ theme }) => theme.shareBarHeight};
  padding: 6px;
  background: white;
  border-top: rgba(220, 220, 220, 0.75) solid 1px;
  transition: transform 0.3s ease;
  z-index: 50;
`;
const StyledWhatsappShareButton = styled(WhatsappShareButton)`
  flex: 0 0 auto !important;
  padding: 0 !important;
  margin: 0 !important;
  margin-right: 3px !important;
  background: none !important;
`;

const StyledFacebookShareButton = styled(FacebookShareButton)`
  flex: 0 0 auto !important;
  padding: 0 !important;
  margin: 0 !important;
  margin-right: 3px !important;
  background: none !important;
`;

const StyledTwitterShareButton = styled(TwitterShareButton)`
  flex: 0 0 auto !important;
  padding: 0 !important;
  margin: 0 !important;
  margin-right: 3px !important;
  background: none !important;
`;

const EmailShareButton = styled.div`
  flex: 0 0 auto;
  padding: 0;
  margin: 0;
  margin-right: 3px;
  background: none;
  width: ${({ theme }) => theme.shareBarButtonSize};
  height: ${({ theme }) => theme.shareBarButtonSize};
  box-sizing: border-box;
  border-radius: calc(${({ theme }) => theme.shareBarButtonSize} / 2);
  background: #8fa9ba;
`;

const StyledEmailIcon = styled(EmailIcon)`
  fill: white;
  margin: 10px;
`;

const ShareButton = styled.div`
  flex: 0 0 auto;
  padding: 0;
  margin: 0;
  margin-right: 5px;
  background: none;
  width: ${({ theme }) => theme.shareBarButtonSize};
  height: ${({ theme }) => theme.shareBarButtonSize};
  box-sizing: border-box;
  border-radius: calc(${({ theme }) => theme.shareBarButtonSize} / 2);
  background: #006ca0;
`;

const StyledShareIcon = styled(ShareIcon)`
  fill: white;
  margin: 9px;
`;

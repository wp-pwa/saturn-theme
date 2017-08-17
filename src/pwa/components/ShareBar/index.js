import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ShareButtons, generateShareIcon } from 'react-share';
import EmailIcon from 'react-icons/lib/fa/envelope';
import ShareIcon from 'react-icons/lib/md/share';
import styled from 'styled-components';
import NextButton from './NextButton';
import * as actions from '../../actions';
import * as deps from '../../deps';

const { FacebookShareButton, WhatsappShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const WhatsappIcon = generateShareIcon('whatsapp');
const TwitterIcon = generateShareIcon('twitter');

const ShareBar = ({ entity, shareModalOpeningRequested, hiddenBars }) =>
  <Container isHidden={hiddenBars}>
    <StyledWhatsappShareButton url={entity.link} title={entity.title.rendered}>
      <WhatsappIcon size={40} round />
    </StyledWhatsappShareButton>
    <StyledFacebookShareButton url={entity.link} title={entity.title.rendered}>
      <FacebookIcon size={40} round />
    </StyledFacebookShareButton>
    <StyledTwitterShareButton url={entity.link} title={entity.title.rendered}>
      <TwitterIcon size={40} round />
    </StyledTwitterShareButton>
    <EmailShareButton
      href={`mailto:?body=${encodeURIComponent(`${entity.title.rendered}\n${entity.link}`)}`}
    >
      <StyledEmailIcon size={20} />
    </EmailShareButton>
    <ShareButton
      onClick={() => shareModalOpeningRequested({ id: entity.id, wpType: `${entity.type}s` })}
    >
      <StyledShareIcon size={22} />
    </ShareButton>
    <NextButton />
  </Container>;

ShareBar.propTypes = {
  entity: PropTypes.shape({}).isRequired,
  shareModalOpeningRequested: PropTypes.func.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  entity: deps.selectors.getCurrentSingle(state),
  hiddenBars: state.theme.postSlider.hiddenBars,
});

const mapDispatchToProps = dispatch => ({
  shareModalOpeningRequested: payload => dispatch(actions.shareModal.openingRequested(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareBar);

const Container = styled.aside`
  display: flex;
  justify-content: space-between;
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
  border-top: rgba(220, 220, 220, .75) solid 1px;
  transition: transform 0.3s ease;
  z-index: 50;
`;

const Button = styled.div`
  flex: 0 0 auto;
  padding: 0;
  margin: 0;
  margin-right: var(--share-bar-button-margin-right);
  background: none;
`;

const StyledWhatsappShareButton = Button.withComponent(WhatsappShareButton);
const StyledFacebookShareButton = Button.withComponent(FacebookShareButton);
const StyledTwitterShareButton = Button.withComponent(TwitterShareButton);

const CustomButton = Button.extend`
  width: ${({ theme }) => theme.shareBarButtonSize};
  height: ${({ theme }) => theme.shareBarButtonSize};
  box-sizing: border-box;
  border-radius: calc(${({ theme }) => theme.shareBarButtonSize} / 2);
`;

const EmailShareButton = CustomButton.extend`background: #8fa9ba;`;
const StyledEmailIcon = styled(EmailIcon)`
  fill: white;
  margin: 10px;
`;

const ShareButton = CustomButton.extend`background: #006ca0;`;
const StyledShareIcon = styled(ShareIcon)`
  fill: white;
  margin: 9px;
`;

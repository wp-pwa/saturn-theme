import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ShareButtons, generateShareIcon } from 'react-share';
import EmailIcon from 'react-icons/lib/fa/envelope';
import ShareIcon from 'react-icons/lib/md/share';
import NextIcon from 'react-icons/lib/fa/angle-right';
import styled from 'styled-components';
import * as actions from '../../actions';
import * as deps from '../../deps';

const { FacebookShareButton, WhatsappShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const WhatsappIcon = generateShareIcon('whatsapp');
const TwitterIcon = generateShareIcon('twitter');

const ShareBar = ({
  entity,
  openShareModal,
  activeSlide,
  sliderLength,
  activePostSlideChangeRequested,
  isListLoading,
  anotherPostsPageRequested,
  hiddenBars,
}) =>
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
    <ShareButton onClick={() => openShareModal({ id: entity.id, wpType: `${entity.type}s` })}>
      <StyledShareIcon size={22} />
    </ShareButton>
    <NextButton
      onClick={() => {
        if (sliderLength && activeSlide + 1 < sliderLength) {
          activePostSlideChangeRequested({
            activeSlide: activeSlide + 1,
            sliderAnimation: 'late',
            sliderLength,
          });
        } else if (!isListLoading) {
          anotherPostsPageRequested();
        }
      }}
    >
      {activeSlide === sliderLength - 1
        ? <NextButtonInner>
          <NextButtonText>
            {isListLoading ? 'Cargando...' : 'Cargar más'}
          </NextButtonText>
        </NextButtonInner>
        : <NextButtonInner>
          <NextButtonText>
            {'Siguiente '}
          </NextButtonText>
          <StyledNextIcon />
        </NextButtonInner>}
    </NextButton>
  </Container>;

ShareBar.propTypes = {
  entity: PropTypes.shape({}).isRequired,
  openShareModal: PropTypes.func.isRequired,
  activeSlide: PropTypes.number.isRequired,
  sliderLength: PropTypes.number.isRequired,
  activePostSlideChangeRequested: PropTypes.func.isRequired,
  isListLoading: PropTypes.bool.isRequired,
  anotherPostsPageRequested: PropTypes.func.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  entity: deps.selectors.getCurrentSingle(state),
  activeSlide: state.theme.postSlider.final.activeSlide,
  sliderLength: deps.selectorCreators.getListResults('currentList')(state).length,
  isListLoading: deps.selectorCreators.isListLoading('currentList')(state),
  hiddenBars: state.theme.postSlider.hiddenBars,
});

const mapDispatchToProps = dispatch => ({
  openShareModal: ({ id, wpType }) => dispatch(actions.shareModal.open({ id, wpType })),
  activePostSlideChangeRequested: payload =>
    dispatch(actions.postSlider.activePostSlideChangeRequested(payload)),
  anotherPostsPageRequested: () => dispatch(deps.actions.anotherPostsPageRequested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareBar);

const Container = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: ${({ theme, isHidden }) => (isHidden ? `-${theme.shareBarHeight}` : 0)};
  left: 0;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  height: ${({ theme }) => theme.shareBarHeight};
  padding: 6px;
  background: white;
  border-top: rgba(220, 220, 220, .75) solid 1px;
  transition: bottom 0.3s ease;
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

const NextButton = styled.button`
  flex: 10 1 auto;
  height: 100%;
  margin: 0;
  padding: 0;
  margin-left: 4px;
  border-radius: 4px;
  background: #bdbdbd;
  font-weight: 600;

  &:focus {
    outline: none;
  }
`;

const NextButtonInner = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NextButtonText = styled.span`
  padding-left: 5px;
  font-size: 0.9em;
  text-transform: uppercase;
`;

const StyledNextIcon = styled(NextIcon)`
  height: 1em;
  width: 1em;
  padding-bottom: 1px;
  padding-left: 2px;
`;

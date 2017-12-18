/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { connect } from "react-redux";
import { ShareButtons, generateShareIcon } from "react-share";
import EmailIcon from "react-icons/lib/fa/envelope";
import ShareIcon from "react-icons/lib/md/share";
import styled from "react-emotion";
import NextButton from "./NextButton";
import * as actions from "../../actions";
import * as selectors from "../../selectors";

const { FacebookShareButton, WhatsappShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon("facebook");
const WhatsappIcon = generateShareIcon("whatsapp");
const TwitterIcon = generateShareIcon("twitter");

class ShareBar extends Component {
  static propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    shareModalOpeningRequested: PropTypes.func.isRequired,
    hiddenBars: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    isListLoading: PropTypes.bool.isRequired,
    isLastSlide: PropTypes.bool.isRequired,
    nextSelected: PropTypes.shape({}),
  };

  static defaultProps = {
    title: null,
    link: null,
    type: null,
    id: null,
    nextSelected: null,
  };

  handleShareModalOpening = () =>
    this.props.shareModalOpeningRequested({
      id: this.props.id,
      wpType: `${this.props.type}s`,
    });

  render() {
    const { hiddenBars, title, link, ready, isListLoading, isLastSlide, nextSelected } = this.props;
    const email = `mailto:?body=${encodeURIComponent(`${title}\n${link}`)}`;

    return ready ? (
      <Container isHidden={hiddenBars}>
        <InnerContainer>
          <StyledWhatsappShareButton url={link} title={title}>
            <WhatsappIcon size={40} />
          </StyledWhatsappShareButton>
          <StyledFacebookShareButton url={link} quote={title}>
            <FacebookIcon size={40} />
          </StyledFacebookShareButton>
          <StyledTwitterShareButton url={link} title={title}>
            <TwitterIcon size={40} />
          </StyledTwitterShareButton>
          <EmailShareButton>
            <a href={email}>
              <StyledEmailIcon size={20} />
            </a>
          </EmailShareButton>
          <ShareButton onClick={this.handleShareModalOpening}>
            <StyledShareIcon size={22} />
          </ShareButton>
        </InnerContainer>
        {isLastSlide && !isListLoading ? null : (
          <NextButton nextSelected={nextSelected} isListLoading={isListLoading} />
        )}
      </Container>
    ) : null;
  }
}

const mapStateToProps = state => ({
  hiddenBars: selectors.post.getHiddenBars(state),
});

const mapDispatchToProps = dispatch => ({
  shareModalOpeningRequested: payload => dispatch(actions.shareModal.openingRequested(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }) => {
    const { id, type, route, next, fromList } = connection.selected;

    if (route === "single" && connection.single[type][id]) {
      const { list } = connection;
      const currentList = fromList ? list[fromList.type][fromList.id] : list.latest.post;

      return {
        id,
        type,
        title: connection.single[type][id].title,
        link: connection.single[type][id]._link,
        ready: true,
        isListLoading: currentList.fetching,
        isLastSlide: !next || !next.id,
        nextSelected: next && { singleType: next.type, singleId: next.id },
      };
    }

    return {
      ready: false,
    };
  })(ShareBar),
);

const Container = styled.aside`
  transform: translateY(${({ theme, isHidden }) => (isHidden ? theme.shareBarHeight : 0)});
  transition: transform 0.3s ease;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  height: ${({ theme }) => theme.shareBarHeight};
  background-color: ${({ theme }) => theme.bgColor};
  z-index: 50;
`;

const InnerContainer = styled.div`
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

const EmailShareButton = styled.div`
  padding: 0;
  margin: 0;
  background: none;
  width: ${({ theme }) => theme.shareBarButtonSize};
  height: ${({ theme }) => theme.shareBarHeight};
  box-sizing: border-box;
  background: #8fa9ba;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledEmailIcon = styled(EmailIcon)`
  fill: white;
  margin: 10px;
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

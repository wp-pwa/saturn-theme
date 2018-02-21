import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import IconLink from 'react-icons/lib/go/link';
import styled, { css } from 'react-emotion';
import * as selectors from '../../selectors';
import * as actions from '../../actions';

const ShareLink = ({ url, onLinkCopied, linkCopied }) => (
  <Container>
    <Icon>
      <StyledIconLink size={20} />
    </Icon>
    <Url>{url}</Url>
    <CopyToClipboard text={url} onCopy={onLinkCopied}>
      <Button>
        <ButtonText linkCopied={linkCopied}>Copiar link</ButtonText>
        <ButtonTextOnClick linkCopied={linkCopied}>Copiado</ButtonTextOnClick>
      </Button>
    </CopyToClipboard>
  </Container>
);

ShareLink.propTypes = {
  url: PropTypes.string.isRequired,
  onLinkCopied: PropTypes.func.isRequired,
  linkCopied: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  linkCopied: selectors.share.isLinkCopied(state),
});

const mapDispatchToProps = dispatch => ({
  onLinkCopied: () => {
    dispatch(actions.share.setLinkCopied({ value: true }));
    setTimeout(() => dispatch(actions.share.setLinkCopied({ value: false })), 1000);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareLink);

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: inline-flex;
  background: transparent;
  overflow: hidden;
`;

const Icon = styled.div`
  flex: 0 0 auto;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  background-color: #8fa9ba;
`;

const StyledIconLink = styled(IconLink)`
  fill: white;
  margin: 10px 0 0 10px;
`;

const Url = styled.span`
  font-size: 14px;
  line-height: 40px;
  white-space: nowrap;
  margin: 0 15px;
  color: #333;
  text-decoration: none;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &:-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  outline: none;
  flex: 0 0 auto;
  border-radius: 3px;
  box-sizing: content-box;
  color: #ffffff;
  background-color: #8fa9ba;
  position: relative;
  padding: 0 10px;
  margin: 7px 0;
  height: 26px;
  min-width: 80px;
  text-align: center;
  font-size: 0.75em;
  line-height: 26px;
  text-transform: uppercase;
  border: none;

  &:focus {
    background-color: #8fa9ba;
  }
`;

const textStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  font-size: inherit;
  line-height: inherit;
  width: 100%;
  height: 100%;
`;

const hidden = css`
  transition: opacity 150ms ease, visibility 0ms ease 150ms;
  visibility: hidden;
  opacity: 0;
`;

const visible = css`
  transition: opacity 150ms ease 150ms, visibility 0ms ease 150ms;
  visibility: visible;
  opacity: 1;
`;

const ButtonText = styled.span`
  ${textStyle} ${({ linkCopied }) => (linkCopied ? hidden : visible)};
`;

const ButtonTextOnClick = styled.span`
  ${textStyle} ${({ linkCopied }) => (linkCopied ? visible : hidden)};
`;

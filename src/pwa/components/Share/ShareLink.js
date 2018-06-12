import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled, { css } from 'react-emotion';
import ShareIcon from './ShareIcon';
import { ButtonContainer } from '../../../shared/styled/Share';

const ShareLink = ({ url, setLinkCopied, isLinkCopied, copyLinkText, copiedLinkText }) => (
  <ButtonContainer>
    <Container>
      <ShareIcon network="copy" />
      <Url>{url}</Url>
      <CopyToClipboard text={url} onCopy={setLinkCopied}>
        <Button>
          <ButtonText isLinkCopied={isLinkCopied}>{copyLinkText}</ButtonText>
          <ButtonTextOnClick isLinkCopied={isLinkCopied}>{copiedLinkText}</ButtonTextOnClick>
        </Button>
      </CopyToClipboard>
    </Container>
  </ButtonContainer>
);

ShareLink.propTypes = {
  url: PropTypes.string.isRequired,
  isLinkCopied: PropTypes.bool.isRequired,
  setLinkCopied: PropTypes.func.isRequired,
  copyLinkText: PropTypes.string.isRequired,
  copiedLinkText: PropTypes.string.isRequired,
};

export default inject(({ theme }) => ({
  isLinkCopied: theme.shareModal.isLinkCopied,
  setLinkCopied: theme.shareModal.setLinkCopied,
  copyLinkText: theme.lang.get('copyLink'),
  copiedLinkText: theme.lang.get('copiedLink'),
}))(ShareLink);

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: inline-flex;
  justify-content: space-between;
  background: transparent;
  overflow: hidden;
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
  ${textStyle} ${({ isLinkCopied }) => (isLinkCopied ? hidden : visible)};
`;

const ButtonTextOnClick = styled.span`
  ${textStyle} ${({ isLinkCopied }) => (isLinkCopied ? visible : hidden)};
`;

import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled, { css } from 'react-emotion';
import ShareIcon from './ShareIcon';
import { ButtonContainer, ShareBadge } from '../../../shared/styled/Share';

const ShareCopy = ({ url, setLinkCopied, isLinkCopied, copyLinkText, copiedLinkText }) => (
  <ButtonContainer>
    <ShareIcon network="copy" />
    <Url>{url}</Url>
    <CopyToClipboard text={url} onCopy={setLinkCopied}>
      <ShareBadge>
        <Text isLinkCopied={isLinkCopied}>{copyLinkText}</Text>
        <TextOnClick isLinkCopied={isLinkCopied}>{copiedLinkText}</TextOnClick>
      </ShareBadge>
    </CopyToClipboard>
  </ButtonContainer>
);

ShareCopy.propTypes = {
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
}))(ShareCopy);

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

const Text = styled.span`
  ${textStyle} ${({ isLinkCopied }) => (isLinkCopied ? hidden : visible)};
`;

const TextOnClick = styled.span`
  ${textStyle} ${({ isLinkCopied }) => (isLinkCopied ? visible : hidden)};
`;

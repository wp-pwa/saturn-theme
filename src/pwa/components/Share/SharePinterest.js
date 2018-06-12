import React from 'react';
import PropTypes from 'prop-types';
import { ShareButtons, generateShareIcon } from 'react-share';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import Counter from './Counter';
import * as actions from '../../actions';

const { PinterestShareButton } = ShareButtons;

const SharePinterest = ({ url, description, media, linkShared, shareText }) => (
  <StyledPinterestShareButton
    url={url}
    description={description}
    media={media}
    onClick={linkShared}
  >
    <StyledIcon size={40} round />
    <Counter method="pinterest" />
    <Button>{shareText}</Button>
  </StyledPinterestShareButton>
);

SharePinterest.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  linkShared: PropTypes.func.isRequired,
  shareText: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  linkShared: () =>
    dispatch(actions.share.linkShared({ network: 'pinterest', component: 'Share modal' })),
});

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  inject(({ stores: { theme } }) => ({
    shareText: theme.lang.get('share'),
  })),
)(SharePinterest);

const StyledPinterestShareButton = styled(PinterestShareButton)`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: inline-flex;
  justify-content: space-between;
  background: transparent;
  overflow: hidden;
  outline: none;

  &:hover,
  &:focus {
    background: transparent;
  }
`;

const StyledIcon = styled(generateShareIcon('pinterest'))`
  flex: 0 0 auto;
`;

const Button = styled.div`
  flex: 0 0 auto;
  border-radius: 3px;
  box-sizing: content-box;
  color: #ffffff;
  position: relative;
  padding: 0 10px;
  min-width: 80px;
  margin: 7px 0;
  height: 26px;
  text-align: center;
  font-size: 0.75em;
  line-height: 26px;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.pinterest};
`;

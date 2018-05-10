import React from 'react';
import PropTypes from 'prop-types';
import { ShareButtons, generateShareIcon } from 'react-share';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import Counter from './Counter';
import * as actions from '../../actions';

const mapTypeToName = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  telegram: 'Telegram',
  whatsapp: 'Whatsapp',
  google: 'GooglePlus',
  linkedin: 'Linkedin',
  email: 'Email',
};

const ShareButton = ({ type, url, title, linkShared, shareText }) => {
  const Icon = generateShareIcon(type);
  const StyledIcon = styled(Icon)`
    flex: 0 0 auto;
  `;

  const Button = ShareButtons[`${mapTypeToName[type]}ShareButton`];
  const StyledButton = styled(Button)`
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

  const buttonProps = { url };

  if (type === 'facebook') {
    buttonProps.quote = title;
  } else if (type === 'email') {
    buttonProps.subject = title;
    buttonProps.body = `${title}\n${url}`;
  } else {
    buttonProps.title = title;
  }

  return (
    <ButtonWrapper onClick={linkShared}>
      <StyledButton {...buttonProps}>
        <StyledIcon size={40} round />
        <Counter method={type} />
        <ShareBadge type={type}>{shareText}</ShareBadge>
      </StyledButton>
    </ButtonWrapper>
  );
};

ShareButton.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  linkShared: PropTypes.func.isRequired,
  shareText: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch, { type }) => ({
  linkShared: () =>
    dispatch(
      actions.share.linkShared({
        network: mapTypeToName[type].toLowerCase(),
        component: 'Share modal',
      }),
    ),
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ theme }) => ({
    shareText: theme.lang.get('share'),
  })),
)(ShareButton);

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShareBadge = styled.div`
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
  background-color: ${({ theme, type }) =>
    ({
      facebook: theme.colors.facebook,
      twitter: theme.colors.twitter,
      whatsapp: theme.colors.whatsapp,
      telegram: theme.colors.telegram,
      linkedin: theme.colors.linkedin,
      google: theme.colors.google,
      email: theme.colors.email,
      others: theme.colors.share,
    }[type] || theme.colors.copy)};
`;

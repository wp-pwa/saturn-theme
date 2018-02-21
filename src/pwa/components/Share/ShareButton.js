import React from 'react';
import PropTypes from 'prop-types';
import { ShareButtons, generateShareIcon } from 'react-share';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

const mapTypeToName = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  telegram: 'Telegram',
  whatsapp: 'Whatsapp',
  google: 'GooglePlus',
  linkedin: 'Linkedin',
  email: 'Email',
};

const ShareButton = ({ type, url, title, counts, linkShared }) => {
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
  } else {
    buttonProps.title = title;
  }

  return (
    <StyledButton {...buttonProps} onClick={linkShared}>
      <StyledIcon size={40} round />
      {counts ? (
        <Counter>
          <CounterValue key="value">{counts}</CounterValue>
          <CounterText key="text">Compartidos</CounterText>
        </Counter>
      ) : null}
      <ShareBadge type={type}>Compartir</ShareBadge>
    </StyledButton>
  );
};

ShareButton.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  counts: PropTypes.number,
  linkShared: PropTypes.func.isRequired,
};

ShareButton.defaultProps = {
  counts: null,
};

const mapStateToProps = (state, { type }) => ({
  counts: selectors.share.getCurrentCounts(state)[type],
});

const mapDispatchToProps = (dispatch, { type }) => ({
  linkShared: () =>
    dispatch(actions.share.linkShared({ network: mapTypeToName[type], component: 'ShareModal' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareButton);

const Counter = styled.div`
  flex: 10 1 auto;
  margin-left: 12px;
  padding-top: 8px;
`;

const CounterValue = styled.span`
  color: #363636;
  font-weight: bold;
  font-size: 16px;
  padding-right: 5px;
`;

const CounterText = styled.span`
  font-size: 13px;
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

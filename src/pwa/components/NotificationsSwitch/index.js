import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withHandlers, compose } from 'recompose';
import Switch from 'rc-switch';
import styled from 'react-emotion';
import IconDisabled from '../../../shared/components/Icons/NotificationsOff';
import IconEnabled from '../../../shared/components/Icons/NotificationsActive';

const NotificationsSwitch = ({
  areSupported,
  areEnabled,
  toggleEnabled,
  notificationsText,
}) =>
  areSupported && (
    <Container onClick={toggleEnabled}>
      <Text>{notificationsText}</Text>
      <StyledSwitch
        checked={areEnabled}
        checkedChildren={<IconEnabled size={16} />}
        unCheckedChildren={<IconDisabled size={16} />}
      />
    </Container>
  );

NotificationsSwitch.propTypes = {
  areSupported: PropTypes.bool.isRequired,
  areEnabled: PropTypes.bool.isRequired,
  notificationsText: PropTypes.string.isRequired,
  toggleEnabled: PropTypes.func.isRequired,
  sendEvent: PropTypes.func.isRequired,
};

export default compose(
  inject(({ stores: { theme, notifications, analytics } }) => ({
    notificationsText: theme.lang.get('notifications'),
    areSupported: notifications.areSupported,
    areEnabled: notifications.areEnabled,
    toggleEnabled: notifications.toggleEnabled,
    sendEvent: analytics.sendEvent,
  })),
  withHandlers({
    onClick: ({ areEnabled, toggleEnabled, sendEvent }) => () => {
      sendEvent({
        category: 'Menu',
        action: areEnabled
          ? 'deactivate notifications'
          : 'activate notifications',
      });
      toggleEnabled();
    },
  }),
)(NotificationsSwitch);

const Container = styled.li`
  bottom: 0;
  width: 100%;
  height: ${({ theme }) => theme.heights.bar};
  border-top: 1px solid #ddd;
  background: white;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  padding: 0 23px;
  text-align: left;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.span`
  font-size: 0.9rem;
`;

const StyledSwitch = styled(Switch)`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 44px;
  height: 22px;
  line-height: 20px;
  vertical-align: middle;
  border-radius: 20px 20px;
  border: 1px solid #ccc;
  background-color: #ccc;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitionTime}
    cubic-bezier(0.35, 0, 0.25, 1);

  & > span {
    color: #fff;
    font-size: 12px;
    position: absolute;
    left: 22px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &:after {
    position: absolute;
    width: 18px;
    height: 18px;
    left: 2px;
    top: 1px;
    border-radius: 50% 50%;
    background-color: #fff;
    content: ' ';
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
    -webkit-transform: scale(1);
    transform: scale(1);
    transition: left ${({ theme }) => theme.transitionTime}
      cubic-bezier(0.35, 0, 0.25, 1);
    -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
    animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
    -webkit-animation-duration: ${({ theme }) => theme.transitionTime};
    animation-duration: ${({ theme }) => theme.transitionTime};
    -webkit-animation-name: rcSwitchOff;
    animation-name: rcSwitchOff;
  }
  &:hover:after {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    -webkit-animation-name: rcSwitchOn;
    animation-name: rcSwitchOn;
  }
  &:focus {
    box-shadow: 0 0 0 2px #d5f1fd;
    outline: none;
  }
  &.rc-switch-checked {
    border: 1px solid #87d068;
    background-color: #87d068;
  }
  &.rc-switch-checked span {
    left: 4px;
  }
  &.rc-switch-checked:after {
    left: 22px;
  }
  &.rc-switch-disabled {
    cursor: no-drop;
    background: #ccc;
    border-color: #ccc;
  }
  &.rc-switch-disabled:after {
    background: #9e9e9e;
    -webkit-animation-name: none;
    animation-name: none;
    cursor: no-drop;
  }
  &.rc-switch-disabled:hover:after {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-name: none;
    animation-name: none;
  }
  &.rc-switch-label {
    display: inline-block;
    line-height: 20px;
    font-size: 14px;
    padding-left: 10px;
    vertical-align: middle;
    white-space: normal;
    pointer-events: none;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  @-webkit-keyframes rcSwitchOn {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.25);
      transform: scale(1.25);
    }
    100% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
  }
  @keyframes rcSwitchOn {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.25);
      transform: scale(1.25);
    }
    100% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
  }
  @-webkit-keyframes rcSwitchOff {
    0% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes rcSwitchOff {
    0% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withHandlers, compose } from 'recompose';
import styled, { keyframes } from 'styled-components';
import Icon from '../../../shared/components/Icons/NotificationsActive';

const NotificationsButton = ({ areSupported, areEnabled, onClick }) =>
  areSupported && (
    <StyledButton enabled={areEnabled} onClick={onClick}>
      <Icon size={22} />
    </StyledButton>
  );

NotificationsButton.propTypes = {
  areSupported: PropTypes.bool.isRequired,
  areEnabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default compose(
  inject(({ stores: { notifications, analytics } }) => ({
    areSupported: notifications.areSupported,
    areEnabled: notifications.areEnabled,
    toggleEnabled: notifications.toggleEnabled,
    sendEvent: analytics.sendEvent,
  })),
  withHandlers({
    onClick: ({ areEnabled, toggleEnabled, sendEvent }) => () => {
      if (areEnabled) return;
      toggleEnabled();
      sendEvent({ category: 'List bar', action: 'activate notifications' });
    },
  }),
)(NotificationsButton);

const wrench = keyframes`
  0%{
    transform:rotate(-12deg);
  }
  0.8%{
    transform:rotate(12deg);
  }
  1%{
    transform:rotate(24deg);
  }
  1.8%,2%{
    transform:rotate(-24deg);
  }
  2.8%,3%{
    transform:rotate(24deg);
  }
  3.8%,4%{
    transform:rotate(-24deg);
  }
  4.8%,5%{
    transform:rotate(24deg);
  }
  5.8%,6%{
    transform:rotate(-24deg);
  }
  6.8%{
    transform:rotate(24deg);
  }
  100%,7.5%{
    transform:rotate(0deg);
  }
`;

const StyledButton = styled.button`
  &,
  &:hover,
  &:focus,
  &:active {
    width: ${({ theme }) => theme.heights.bar};
    height: ${({ theme }) => theme.heights.bar};
    padding: 0;
    margin: 0;
    border-radius: ${({ theme }) => `calc((${theme.heights.bar} - 20px) / 2)`};
    border-style: none;
    background: transparent;
    box-sizing: border-box;
    appearance: none;
    outline: none;
    opacity: ${({ enabled }) => (enabled ? '0' : '1')};
    transform: ${({ enabled }) => (enabled ? 'scale(0.6)' : 'scale(1)')};
    transition: all ${({ theme }) => theme.transitionTime};
  }

  svg {
    animation: ${wrench} 15s ease infinite;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    font-size: 0.9rem;
    margin-left: 1rem;
  }
`;

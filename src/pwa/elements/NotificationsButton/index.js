import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-icons/lib/md/notifications-active';
import styled, { keyframes } from 'styled-components';
import { notifications } from '../../actions';
import * as selectors from '../../selectors';

const NotificationsButton = ({ supported, enabled, enable }) => (
  supported &&
  <StyledButton enabled={enabled} onClick={enabled ? () => {} : enable}>
    <Icon size={22} />
  </StyledButton>
);

NotificationsButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  supported: PropTypes.bool.isRequired,
  enable: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  supported: selectors.notifications.supported(state),
  enabled: selectors.notifications.enabled(state),
});

const mapDispatchToProps = dispatch => ({
  enable: () => dispatch(notifications.hasBeenRequested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsButton);

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
    width: calc(${({ theme }) => theme.titleSize} - 20px);
    height: calc(${({ theme }) => theme.titleSize} - 20px);
    padding: 0;
    margin: 10px;
    border-radius: calc((${({ theme }) => theme.titleSize} - 20px) / 2);
    background: transparent;
    box-sizing: border-box;
    appearance: none;
    outline: none;
    opacity: ${({ enabled }) => (enabled ? '0' : '1')};
    transform: scale(${({ enabled }) => (enabled ? '0' : '1')});
    transition: 0.3s opacity ${({ enabled }) => (enabled ? '' : '.2s')}, 0.5s transform,
      0.5s background;
  }

  svg {
    animation: ${wrench} 15s ease infinite;
    color: ${({ theme }) => theme.color};
  }

  span {
    font-size: 0.9rem;
    margin-left: 1rem;
  }
`;

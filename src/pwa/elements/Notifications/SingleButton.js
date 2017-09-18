import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-icons/lib/md/notifications-active';
import styled, { keyframes } from 'styled-components';
import { notifications } from '../../actions';
import * as selectors from '../../selectors';

const SingleButton = ({ color, enabled, enable }) => (
  <StyledButton enabled={enabled} onClick={enabled ? () => {} : enable}>
    <Icon size={24} color={color} />
  </StyledButton>
);

SingleButton.propTypes = {
  color: PropTypes.string,
  enabled: PropTypes.bool.isRequired,
  enable: PropTypes.func.isRequired,
};

SingleButton.defaultProps = {
  color: 'white',
};

const mapStateToProps = state => ({
  enabled: selectors.notifications.enabled(state),
});

const mapDispatchToProps = dispatch => ({
  enable: () => dispatch(notifications.hasBeenRequested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleButton);

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
    background: transparent;
    box-sizing: border-box;
    appearance: none;
    outline: none;
    margin: 0;
    opacity: ${({ enabled }) => (enabled ? '0' : '1')};
    transition: 0.3s opacity;
    animation: ${wrench} 15s ease infinite;
  }

  span {
    font-size: .9rem;
    margin-left: 1rem;
  }
`;

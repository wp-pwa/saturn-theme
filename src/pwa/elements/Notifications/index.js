import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import IconEnabled from 'react-icons/lib/md/notifications-active';
import IconDisabled from 'react-icons/lib/md/notifications-off';
import styled from 'styled-components';
import { notifications } from '../../actions';
import * as selectors from '../../selectors';

const Notifications = ({ enabled, enable, disable }) => (
  <StyledButton enabled={enabled} onClick={enabled ? disable : enable}>
    {enabled ? <IconEnabled size={24} /> : <IconDisabled size={24} />}
    <span>{`Notificaciones ${enabled ? 'activadas' : 'desactivadas'}`}</span>
  </StyledButton>
);

Notifications.propTypes = {
  enabled: PropTypes.bool.isRequired,
  enable: PropTypes.func.isRequired,
  disable: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  enabled: selectors.notifications.enabled(state),
});

const mapDispatchToProps = dispatch => ({
  enable: () => dispatch(notifications.hasBeenRequested()),
  disable: () => dispatch(notifications.hasBeenDisabled()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

const StyledButton = styled.button`
  &,
  &:hover,
  &:focus {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${({ theme }) => theme.titleSize};
    box-sizing: border-box;
    text-align: left;
    appearance: none;
    background: white;
    outline: none;
    margin: 0;
    color: ${({ enabled }) => (enabled ? '#333' : '#999')};
    transition: 0.3s color;
    border-left: 3px solid transparent;
    padding-left: 20px;
    padding-right: 10px;
    padding-top: 0;
    padding-bottom: 0;
  }

  span {
    font-size: .9rem;
    margin-left: 1rem;
  }
`;

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-icons/lib/md/notifications-active';
import styled from 'styled-components';
import { notifications } from '../../actions';
import * as selectors from '../../selectors';

const Notifications = ({ enabled, enableNotifications }) => (
  !enabled && <StyledButton onClick={enableNotifications}>
    <Icon size={24} color={'white'}/>
  </StyledButton>
);

Notifications.propTypes = {
  enabled: PropTypes.bool.isRequired,
  enableNotifications: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  enabled: selectors.notifications.enabled(state), // TODO change this, PLEASE
});

const mapDispatchToProps = dispatch => ({
  enableNotifications: () => dispatch(notifications.hasBeenRequested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

const StyledButton = styled.button`
  border: none;
  background: none;
`;

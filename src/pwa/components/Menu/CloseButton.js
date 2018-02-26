import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';
import { Container } from '../../../shared/styled/Menu/CloseButton';
import * as actions from '../../actions';

const CloseButton = ({ menuHasClosed }) => (
  <Container onClick={menuHasClosed}>
    <IconClose size={33} />
  </Container>
);

CloseButton.propTypes = {
  menuHasClosed: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed()),
});

export default connect(null, mapDispatchToProps)(CloseButton);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconMenu from 'react-icons/lib/md/menu';
import { Container } from '../../../shared/styled/Menu/MenuButton';
import * as actions from '../../actions';

const MenuButton = ({ menuHasOpen }) => (
  <Container onClick={menuHasOpen}>
    <IconMenu size={33} color="inherit" />
  </Container>
);

MenuButton.propTypes = { menuHasOpen: PropTypes.func.isRequired };

const mapDispatchToProps = (dispatch, { component }) => ({
  menuHasOpen: () =>
    dispatch(
      actions.menu.hasOpen({
        component,
      }),
    ),
});

export default connect(null, mapDispatchToProps)(MenuButton);

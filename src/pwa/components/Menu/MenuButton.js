import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconMenu from 'react-icons/lib/md/menu';
import styled from 'react-emotion';
import * as actions from '../../actions';

const MenuButton = ({ menuHasOpen }) => (
  <Container onClick={menuHasOpen}>
    <IconMenu size={33} />
  </Container>
);

MenuButton.propTypes = { menuHasOpen: PropTypes.func.isRequired };

const mapDispatchToProps = dispatch => ({
  menuHasOpen: () => dispatch(actions.menu.hasOpen())
});

export default connect(null, mapDispatchToProps)(MenuButton);

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-left: 15px;
  z-index: 50;
`;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import IconClose from 'react-icons/lib/md/close';
import * as actions from '../../actions';

const MenuClose = ({ menuHasClosed }) => (
  <Container onClick={menuHasClosed}>
    <IconClose size={33} />
  </Container>
);

MenuClose.propTypes = {
  menuHasClosed: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed()),
});

export default connect(null, mapDispatchToProps)(MenuClose);

const Container = styled.div`
  width: ${({ theme }) => theme.titleSize};
  height: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
`;

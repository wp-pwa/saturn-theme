import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as selectors from '../../selectors';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';

const Menu = () => (
  <amp-sidebar id="sidebar" layout="nodisplay" side="left">
    <Container>
      <MenuHeader />
      <MenuList />
    </Container>
  </amp-sidebar>
);

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  menuHasClosed: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isOpen: selectors.menu.isOpen(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: ${({ isOpen }) => (isOpen ? '' : 'visibility 0s ease-in 300ms')};
  z-index: 150;
`;

const Overlay = styled.div`
  filter: ${({ isOpen }) => (isOpen ? 'opacity(100%)' : 'opacity(0%)')};
  transition: filter 300ms ease;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0%)' : 'translateX(-100%)')};
  width: 75vw;
  height: 100%;
  background-color: #fff;
  transition: transform 300ms ease-out;
  z-index: 151;
`;

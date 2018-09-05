import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';

const Menu = ({ isOpen, close }) => (
  <Fragment>
    <Overlay isOpen={isOpen} onClick={close} onTouchMove={close} />
    <Container isOpen={isOpen}>
      <MenuHeader />
      <MenuList />
    </Container>
  </Fragment>
);

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default inject(({ stores: { theme } }) => ({
  isOpen: theme.menu.isOpen,
  close: theme.menu.close,
}))(Menu);

const transitionCurve = ({ isOpen }) => (isOpen ? 'ease-out' : 'ease-in');

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  filter: ${({ isOpen }) => (isOpen ? 'opacity(50%)' : 'opacity(0%)')};
  transition: filter ${({ theme }) => theme.transitionTime} ${transitionCurve};
  background-color: #000;
  z-index: 150;
  will-change: transform, opacity;
`;

const Container = styled.div`
  position: fixed;
  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0%)' : 'translateX(-100%)'};
  width: 75vw;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  transition: transform ${({ theme }) => theme.transitionTime}
    ${transitionCurve};
  z-index: 151;
  will-change: transform;
`;

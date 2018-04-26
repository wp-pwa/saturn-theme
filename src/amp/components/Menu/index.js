import React, { Fragment } from 'react';
import styled from 'react-emotion';
import { Helmet } from 'react-helmet';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';

const Menu = () => (
  <Fragment>
    <Helmet>
      <script
        async=""
        custom-element="amp-sidebar"
        src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
      />
    </Helmet>
    <amp-sidebar id="menu" layout="nodisplay" side="left">
      <Container>
        <MenuHeader />
        <MenuList />
      </Container>
    </amp-sidebar>
  </Fragment>
);

export default Menu;

const Container = styled.div`
  width: 75vw;
  height: 100%;
  z-index: 150;
  background-color: ${({ theme }) => theme.colors.white};
`;

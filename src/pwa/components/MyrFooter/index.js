import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import About from './About';
import Legal from './Legal';
import Powered from './Powered';

const MyRFooter = ({ bar }) => (
  <Container bar={bar}>
    <About />
    <Legal />
    <Powered />
  </Container>
);

MyRFooter.propTypes = {
  bar: PropTypes.string.isRequired
};

export default inject(({ connection }) => ({
  bar: connection.context.options.bar
}))(MyRFooter);

const Container = styled.div`
  width: 100vw;
  box-sizing: border-box;
  padding-bottom: ${({ theme, bar }) => (bar === 'single' ? theme.shareBarHeight : '')};
`;

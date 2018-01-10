/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container, Logo, Title } from '../../../shared/styled/Footer';

const Footer = ({ bar }) => (
  <Container bar={bar}>
    <Logo>
      <Title>powered by</Title>
      <a href="https://worona.org" rel="noopener nofollow" target="_blank">
        <img
          src="https://worona-cdn.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100"
          width="100"
          height="17"
          srcSet="https://worona-cdn.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100 1x, https://worona-cdn.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=200 2x"
          alt="Logo de Worona"
        />
      </a>
    </Logo>
  </Container>
);

Footer.propTypes = {
  bar: PropTypes.string.isRequired
};

export default inject(({ connection }) => ({
  bar: connection.context.options.bar
}))(Footer);

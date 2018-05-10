/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container, Logo, Title } from '../../../shared/styled/Footer';

const Footer = ({ bar, poweredByText }) => (
  <Container bar={bar}>
    <Logo>
      <Title>{poweredByText}</Title>
      <a href="https://worona.org" rel="noopener nofollow" target="_blank">
        <amp-img
          src="https://worona-cdn.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100"
          width="100"
          height="17"
          layout="fixed"
          srcSet="https://worona-cdn.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100 1x, https://worona-cdn.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=200 2x"
          alt="Logo de Worona"
        />
      </a>
    </Logo>
  </Container>
);

Footer.propTypes = {
  bar: PropTypes.string.isRequired,
  poweredByText: PropTypes.string.isRequired,
};

export default inject(({ connection, theme }) => ({
  bar: connection.selectedContext.options.bar,
  poweredByText: theme.lang.get('poweredBy'),
}))(Footer);

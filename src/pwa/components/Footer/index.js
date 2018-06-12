/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container, Logo, Title, Desktop } from '../../../shared/styled/Footer';

const Footer = ({ loadClassicVersion, bar, poweredDisplay, poweredBy, classicVersion }) => (
  <Container bar={bar}>
    {poweredDisplay && (
      <Logo>
        <Title>{poweredBy}</Title>
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
    )}
    <Desktop onClick={loadClassicVersion}>{classicVersion}</Desktop>
  </Container>
);

Footer.propTypes = {
  loadClassicVersion: PropTypes.func.isRequired,
  bar: PropTypes.string.isRequired,
  poweredDisplay: PropTypes.bool,
  poweredBy: PropTypes.string.isRequired,
  classicVersion: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  poweredDisplay: true,
};

export default inject(({ stores: { connection, settings, theme } }) => {
  const powered = settings.theme.powered || {};

  return {
    bar: connection.selectedContext.options.bar,
    poweredDisplay: powered.display,
    poweredBy: theme.lang.get('poweredBy'),
    classicVersion: theme.lang.get('classicVersion'),
    loadClassicVersion: theme.loadClassicVersion,
  };
})(Footer);

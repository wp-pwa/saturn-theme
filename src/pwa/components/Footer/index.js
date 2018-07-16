/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { parse } from 'url';
import { Container, Logo, Title, Desktop } from '../../../shared/styled/Footer';
import Frontity from './Frontity';

const Footer = ({
  loadClassicVersion,
  bar,
  poweredDisplay,
  poweredBy,
  classicVersion,
  host,
}) => (
  <Container bar={bar}>
    {poweredDisplay && (
      <Logo>
        <Title>{poweredBy}</Title>
        <a
          href={`https://frontity.com/?utm_source=footer&utm_medium=link&utm_campaign=footer_v1&utm_content=${host}`}
          rel="noopener nofollow"
          target="_blank"
        >
          <Frontity />
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
  host: PropTypes.string.isRequired,
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
    host: parse(settings.generalSite.url).host,
  };
})(Footer);

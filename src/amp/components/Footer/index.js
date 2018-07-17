/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { parse } from 'url';
import { Container, Logo, Title } from '../../../shared/styled/Footer';
import Frontity from '../../../pwa/components/Footer/Frontity';

const Footer = ({ bar, poweredByText, host }) => (
  <Container bar={bar}>
    <Logo>
      <Title>{poweredByText}</Title>
      <a
        href={`https://frontity.com/?utm_source=${host}&utm_medium=footer-v1&utm_campaign=powered-by-frontity`}
        rel="noopener nofollow"
        target="_blank"
      >
        <Frontity />
      </a>
    </Logo>
  </Container>
);

Footer.propTypes = {
  bar: PropTypes.string.isRequired,
  poweredByText: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
};

export default inject(({ stores: { connection, theme, settings } }) => ({
  bar: connection.selectedContext.options.bar,
  poweredByText: theme.lang.get('poweredBy'),
  host: parse(settings.generalSite.url).host,
}))(Footer);

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';
import { ContainerAmp, Header, Title, Body, Text, Url } from '../../../shared/styled/Cookies';
import { cookies as cookiesButton } from '../../analytics/classes';

const Cookies = ({ cookiesUrl, linkStyles }) => (
  <Fragment>
    <Helmet>
      <script
        async=""
        custom-element="amp-user-notification"
        src="https://cdn.ampproject.org/v0/amp-user-notification-0.1.js"
      />
    </Helmet>
    <ContainerAmp>
      <amp-user-notification id="cookies" layout="nodisplay">
        <Header>
          <Title>Política de cookies</Title>
        </Header>
        <Body>
          <Text>
            {`Utilizamos cookies para personalizar el contenido, características y anuncios.
              Compartimos información sobre el uso de nuestro sitio con nuestros socios, que pueden
              combinarla con otros datos aportados en sus servicios. `}
            {cookiesUrl ? (
              <Url href={cookiesUrl} rel="noopener" target="_blank" linkStyles={linkStyles}>
                Leer más
              </Url>
            ) : null}
          </Text>
          <button clasName={cookiesButton} on="tap:cookies.dismiss">
            <span>Aceptar</span>
          </button>
        </Body>
      </amp-user-notification>
    </ContainerAmp>
  </Fragment>
);

Cookies.propTypes = {
  cookiesUrl: PropTypes.string,
  linkStyles: PropTypes.shape({}),
};

Cookies.defaultProps = {
  cookiesUrl: null,
  linkStyles: null,
};

export default inject(({ settings }) => {
  const { cookies } = settings.theme.cookies || {};
  return {
    linkStyles: settings.theme.linkStyles,
    cookiesUrl: cookies.url,
  };
})(Cookies);

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { dep } from 'worona-deps';
import { Container, Header, Title, Body, Text, Url, Button } from '../../../shared/styled/Cookies';

const Cookies = ({ cookiesUrl, linkStyles }) => (
  <Fragment>
    <Helmet>
      <script
        async=""
        custom-element="amp-user-notification"
        src="https://cdn.ampproject.org/v0/amp-user-notification-0.1.js"
      />
    </Helmet>
    <amp-user-notification id="cookies" layout="nodisplay">
      <div role="button" tabIndex="0">
        <Container>
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
            <button on="tap:cookies.dismiss">Aceptar</button>
          </Body>
        </Container>
      </div>
    </amp-user-notification>
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

const mapStateToProps = state => ({
  cookiesUrl: dep('settings', 'selectorCreators', 'getSetting')('theme', 'cookiesUrl')(state),
  linkStyles: dep('settings', 'selectorCreators', 'getSetting')('theme', 'linkStyles')(state),
});

export default connect(mapStateToProps)(Cookies);

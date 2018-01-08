import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Header, Title, Body, Text, Button } from '../../../shared/styled/Cookies';

const Cookies = () => [
  <Helmet>
    <script
      async
      custom-element="amp-user-notification"
      src="https://cdn.ampproject.org/v0/amp-user-notification-0.1.js"
    />
  </Helmet>,
  <amp-user-notification id="cookies" layout="nodisplay">
    <div on="tap:cookies.dismiss">
      <Container>
        <Header>
          <Title>Política de cookies</Title>
        </Header>
        <Body>
          <Text>
            Utilizamos cookies para personalizar el contenido, características y anuncios.
            Compartimos información sobre el uso de nuestro sitio con nuestros socios, que pueden
            combinarla con otros datos aportados en sus servicios.
          </Text>
          <Button on="tap:cookies.dismiss">Aceptar</Button>
        </Body>
      </Container>
    </div>
  </amp-user-notification>
];

export default Cookies;

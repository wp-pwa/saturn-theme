import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import Transition from 'react-transition-group/Transition';
import { Container, Header, Title, Body, Text, Url } from '../../../shared/styled/Cookies';

const Cookies = ({ accepted, cookiesUrl, linkStyles, cookiesHaveBeenAccepted }) => (
  <Transition
    in={!accepted}
    timeout={{ enter: 1000, exit: 500 }}
    mountOnEnter
    unmountOnExit
    onEnter={node => node.scrollTop}
    appear
  >
    {status => (
      <Container status={status}>
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
          <button onClick={cookiesHaveBeenAccepted}>
            <span>
              <span>Aceptar</span>
            </span>
          </button>
        </Body>
      </Container>
    )}
  </Transition>
);

Cookies.propTypes = {
  accepted: PropTypes.bool.isRequired,
  cookiesUrl: PropTypes.string,
  linkStyles: PropTypes.shape({}),
  cookiesHaveBeenAccepted: PropTypes.func.isRequired,
};

Cookies.defaultProps = {
  linkStyles: null,
  cookiesUrl: null,
};

const mapStateToProps = state => {
  const cookies =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'cookies')(state) || {};

  return {
    cookiesUrl: cookies.url,
    linkStyles: dep('settings', 'selectorCreators', 'getSetting')('theme', 'linkStyles')(state),
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ theme }) => ({
    accepted: theme.cookies.accepted,
    cookiesHaveBeenAccepted: theme.cookies.haveBeenAccepted,
  })),
)(Cookies);

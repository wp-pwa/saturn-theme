import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import Transition from 'react-transition-group/Transition';
import { Container, Header, Title, Body, Text, Url, Button } from '../../../shared/styled/Cookies';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

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
          <button onClick={cookiesHaveBeenAccepted}>Aceptar</button>
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

const mapStateToProps = state => ({
  accepted: selectors.cookies.accepted(state),
  cookiesUrl: dep('settings', 'selectorCreators', 'getSetting')('theme', 'cookiesUrl')(state),
  linkStyles: dep('settings', 'selectorCreators', 'getSetting')('theme', 'linkStyles')(state),
});

const mapDispatchToProps = dispatch => ({
  cookiesHaveBeenAccepted: () => dispatch(actions.cookies.haveBeenAccepted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cookies);

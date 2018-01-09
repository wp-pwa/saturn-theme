import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';
import { Container, Header, Title, Body, Text, Button } from '../../../shared/styled/Cookies';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

const Cookies = ({ accepted, cookiesHaveBeenAccepted }) => (
  <Transition
    in={!accepted}
    timeout={{ enter: 1000, exit: 500 }}
    mountOnEnter
    unmountOnExit
    onEnter={node => node.scrollTop}
    appear
  >
    {status => (
      <Container status={status} onClick={cookiesHaveBeenAccepted}>
        <Header>
          <Title>Política de cookies</Title>
        </Header>
        <Body>
          <Text>
            {`Utilizamos cookies para personalizar el contenido, características y anuncios.
              Compartimos información sobre el uso de nuestro sitio con nuestros socios, que pueden
              combinarla con otros datos aportados en sus servicios`}
          </Text>
          <Button>Aceptar</Button>
        </Body>
      </Container>
    )}
  </Transition>
);

Cookies.propTypes = {
  accepted: PropTypes.bool.isRequired,
  cookiesHaveBeenAccepted: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  accepted: selectors.cookies.accepted(state)
});

const mapDispatchToProps = dispatch => ({
  cookiesHaveBeenAccepted: () => dispatch(actions.cookies.haveBeenAccepted())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cookies);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import { cookies } from '../../actions';

const Cookies = ({ cookiesAccepted, cookiesHaveBeenRequested }) =>
  <Transition
    in={!cookiesAccepted}
    timeout={{ enter: 1000, exit: 500 }}
    mountOnEnter
    unmountOnExit
    onEnter={node => node.scrollTop}
  >
    {status =>
      <Container status={status}>
        <Header>
          <Title>
            {'Política de cookies'}
          </Title>
        </Header>
        <Body>
          <Text>
            {`Utilizamos cookies para personalizar el contenido, características y anuncios.
              Compartimos información sobre el uso de nuestro sitio con nuestros socios, que pueden
              combinarla con otros datos aportados en sus servicios`}
          </Text>
          <Button onClick={cookiesHaveBeenRequested}>
            {'Aceptar'}
          </Button>
        </Body>
      </Container>}
  </Transition>;

Cookies.propTypes = {
  cookiesAccepted: PropTypes.bool,
  cookiesHaveBeenRequested: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cookiesAccepted: state.theme.cookies.accepted,
});

const mapDispatchToProps = dispatch => ({
  cookiesHaveBeenRequested: () => dispatch(cookies.haveBeenRequested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cookies);

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  background-color: #fff;
  color: #333;
  position: fixed;
  left: 0;
  bottom: 0;
  transform: translateY(${({ status }) => (status.startsWith('enter') ? 0 : 100)}%);
  transition: transform 500ms ease ${({ status }) => (status.startsWith('exit') ? 0 : 500)}ms;
  box-shadow: 0 0 3px 0 #999;
  z-index: 300;
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
  width: 100%;
  height: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  padding: 15px;
  margin: 0;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Text = styled.p`
  padding: 0 20px;
  margin: 10px 0;
  font-size: 0.8rem;
`;

const Button = styled.button`
  height: 36px;
  margin: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  font-size: 0.9rem;
  border: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover {
    background-color: ${({ theme }) => theme.bgColor};
    filter: brightness(120%);
  }
`;

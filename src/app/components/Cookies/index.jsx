import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { cookies } from '../../actions';

const Cookies = ({ cookiesAccepted, cookiesHaveBeenRequested }) =>
  !cookiesAccepted &&
  <Container>
    <Header>
      <Title>
        {'Política de cookies'}
      </Title>
    </Header>
    <Body>
      <Text>
        {
          'Utilizamos cookies para personalizar el contenido, características y anuncios. Compartimos información sobre el uso de nuestro sitio con nuestros socios, que pueden combinarla con otros datos aportados en sus servicios'
        }
      </Text>
      <Button
        onClick={() => {
          cookiesHaveBeenRequested();
        }}
      >
        {'Aceptar'}
      </Button>
    </Body>
  </Container>;

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

const showCookies = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  background-color: #fff;
  color: #333;
  position: fixed;
  left: 0;
  bottom: 0;
  box-shadow: 0 0 3px 0 #999;
  z-index: 300;

  animation-name: ${showCookies};
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
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

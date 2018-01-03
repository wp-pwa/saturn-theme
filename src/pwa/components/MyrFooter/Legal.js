/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styled from 'react-emotion';

const Legal = () => (
  <Container>
    <List>
      <Item>
        <a href="https://www.mediosyredes.com/aviso-legal/" rel="noopener" target="_blank">
          Aviso legal
        </a>
      </Item>
      <Item>
        <a href="https://www.mediosyredes.com/politica/" rel="noopener" target="_blank">
          Política de privacidad y cookies
        </a>
      </Item>
    </List>
    <Text>
      © Contenidos bajo licencia Creative Commons (CC) 1995-2017 Medios y Redes Online. Otros
      contenidos se cita fuente
    </Text>
  </Container>
);

export default Legal;

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
  padding: 15px 20px;
`;

const List = styled.ul`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  font-size: 0.8rem;
  list-style: none;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0;
`;

const Item = styled.li`
  margin: 0;
  padding: 0 7px;
  font-weight: 600;
`;

const Text = styled.p`
  text-d: 100%;
  margin: 0;
  padding-top: 10px;
  box-sizing: border-box;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 200;
`;

/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styled from 'react-emotion';

const About = () => (
  <Container>
    <Logo href="https://www.mediosyredes.com" rel="noopener" target="_blank">
      <img
        alt="Logo de Medios y Redes"
        src="https://www.mediosyredes.com/wp-content/uploads/2016/08/logo-280.png"
      />
    </Logo>
    <Text>
      Empresa con más de 20 años de experiencia en blogging y una amplia red de medios digitales que
      ofrece servicios relacionados con los contenidos online: redacción de blogs y webs,
      publicidad, post patrocinados, y diseño y desarrollo web.
    </Text>
    <List>
      <Item>
        <a href="https://www.mediosyredes.com" rel="noopener" target="_blank">
          Más información
        </a>
      </Item>
      <Item>
        <a href="https://www.mediosyredes.com/contacto/" rel="noopener" target="_blank">
          Contacto
        </a>
      </Item>
    </List>
  </Container>
);

export default About;

const Container = styled.div`
  padding: 25px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.a`
  box-sizing: content-box;
  height: 100px;
  padding-bottom: 10px;
`;

const Text = styled.p`
  box-sizing: border-box;
  margin: 0;
  font-size: 0.9rem;
  text-align: center;
  padding-bottom: 15px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  list-style: none;
`;

const Item = styled.li`
  margin: 0;
  padding: 0 7px;
  font-size: 0.9rem;
  font-weight: 600;
`;

import React from 'react';
import styled from 'styled-components';

const Footer = () =>
  <Container>
    <Title>
      {'powered by'}
    </Title>
    <img
      src="https://worona.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100"
      width="100"
      height="17"
      srcSet="https://worona.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100 1x, https://worona.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=200 2x"
      alt="Logo de Worona"
    />
  </Container>;

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 120px;
  padding: 5px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const Title = styled.span`
  font-size: 0.8rem;
  margin-bottom: 8px;
`;

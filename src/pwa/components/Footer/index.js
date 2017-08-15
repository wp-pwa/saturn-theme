import React from 'react';
import styled from 'styled-components';

const Footer = () =>
  <Container>
    <div>
      {'powered by'}
    </div>
    <img
      src="https://worona.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100"
      width="100"
      height="17"
      srcSet="https://worona.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100 1x, https://worona.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=200 2x"
      alt=""
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
  ${'' /* background: white;
  box-shadow: 0 0 3px 0 #999; */}
  ${'' /* background: linear-gradient(transparent, #eee); */}

  div {
    font-size: 0.8rem;
    margin-bottom: 8px;
  }
`;

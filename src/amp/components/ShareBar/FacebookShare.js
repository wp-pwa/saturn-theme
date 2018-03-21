import React from 'react';
import styled from 'react-emotion';
import IconFacebook from 'react-icons/lib/fa/facebook';
import { shareButtonFacebook } from '../../analytics/classes';

const FacebookShare = props => {
  const href = `https://www.facebook.com/sharer/sharer.php?${Object.keys(props)
    .filter(key => !!props[key])
    .map(key => `${key}=${encodeURIComponent(props[key])}`)
    .join('&')}`;

  return (
    <Container className={shareButtonFacebook} href={href} target="_blank">
      <IconFacebook size={28} verticalAlign="none" />
    </Container>
  );
};

export default FacebookShare;

const Container = styled.a`
  box-sizing: border-box;
  width: ${({ theme }) => theme.heights.bar};
  height: ${({ theme }) => theme.heights.bar};
  background-color: ${({ theme }) => theme.colors.facebook};
  color: ${({ theme }) => theme.colors.white}
  display: flex;
  justify-content: center;
  align-items: center;
`;

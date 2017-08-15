import React from 'react';
import styled from 'styled-components';
import PostList from '../PostList';

const Home = () =>
  <Container>
    <PostList />
  </Container>;

export default Home;

const Container = styled.div`
  padding-top: calc(${props => props.theme.titleSize} + ${props => props.theme.navbarSize});
  box-sizing: border-box;
  height: 100vh;

  &::-webkit-scrollbar {
    display: none;
  }
`;

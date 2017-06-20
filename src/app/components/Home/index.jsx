import React from 'react';
import { GridContainer, GridRow } from 'mcr-worona';
import Header from '../Header';
import PostList from '../PostList';

const Home = () => (
  <GridContainer style={{ padding: 0 }}>
    <GridRow>
      <Header />
    </GridRow>
    <GridRow>
      <PostList />
    </GridRow>
  </GridContainer>
);

export default Home;

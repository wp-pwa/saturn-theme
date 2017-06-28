import React from 'react';
import PostList from '../PostList';

import styles from './styles.css';

const Home = () =>
  <div className={styles.home}>
    <PostList />
  </div>;

export default Home;

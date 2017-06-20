import React from 'react';
import Title from './Title';
import Navbar from './Navbar';
import styles from './styles.css';

const Header = () => (
  <div className={styles.header}>
    <Title />
    <Navbar />
  </div>
);

export default Header;

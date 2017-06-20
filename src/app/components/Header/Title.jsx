import React from 'react';
import IconMenu from 'react-icons/lib/md/menu';
import styles from './styles.css';

const Title = () => (
  <div className={styles.title}>
    <div className={styles.menuButton}>
      <IconMenu size={30} />
    </div>
    <div className={styles.logo}>
      <span>LOGO</span>
    </div>
  </div>
);

export default Title;

import React from 'react';

import styles from './styles.css';

const Spinner = () => (
  <div className={styles.wrap}>
    <div className={`${styles['sk-fading-circle']}`}>
      <div className={`${styles['sk-circle1']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle2']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle3']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle4']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle5']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle6']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle7']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle8']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle9']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle10']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle11']} ${styles['sk-circle']}`} />
      <div className={`${styles['sk-circle12']} ${styles['sk-circle']}`} />
    </div>
  </div>
);

export default Spinner;

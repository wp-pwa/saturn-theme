import React, { PropTypes } from 'react';

import styles from './styles.css';

const Slide = ({ active, length }) =>
  <div className={styles.slide}>
    <div className={styles.pointsContainer}>
      <div className={styles.point} />
      <div className={styles.point} />
      <div className={`${styles.point} ${styles.pointActive}`} />
      <div className={styles.point} />
      <div className={styles.point} />
    </div>
  </div>;

Slide.propTypes = {
  active: PropTypes.number.isRequired,
};

// ----> NEXT: Create selectors for swipe state

// const mapStateToProps = () => ({
//   active:
// })

export default Slide;

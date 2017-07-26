import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './styles.css';

class SliderPoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: props.animation,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      this.setState(
        {
          animation: null,
        },
        () => {
          setTimeout(() => {
            const animation = nextProps.animation === 'left' ? 'left' : 'right';

            this.setState({
              animation,
            });
          }, nextProps.animation === 'late' ? 350 : 20);
        }
      );
    }
  }

  render() {
    return (
      <div className={styles.slider}>
        <div
          className={`${styles.pointsContainer} ${this.state.animation
            ? styles[`animate-${this.state.animation}`]
            : ''}`}
        >
          <div className={`${styles.point} ${styles.point1}`} />
          <div className={`${styles.point} ${styles.point2}`} />
          <div className={`${styles.point} ${styles.point3}`} />
          <div className={`${styles.point} ${styles.point4}`} />
        </div>
      </div>
    );
  }
}

SliderPoints.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  animation: PropTypes.oneOf(['left', 'right', 'late']),
};

const mapStateToProps = state => ({
  activeIndex: state.theme.postSlider.activeSlide,
  animation: state.theme.postSlider.sliderAnimation,
});

export default connect(mapStateToProps)(SliderPoints);

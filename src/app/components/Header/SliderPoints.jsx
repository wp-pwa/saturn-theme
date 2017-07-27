import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './styles.css';

class SliderPoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: props.sliderAnimation,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeSlide !== this.props.activeSlide) {
      this.setState(
        {
          animation: null,
        },
        () => {
          setTimeout(() => {
            const animation = nextProps.sliderAnimation === 'left' ? 'left' : 'right';

            this.setState({
              animation,
            });
          }, nextProps.sliderAnimation === 'late' ? 350 : 20);
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
  activeSlide: PropTypes.number.isRequired,
  sliderAnimation: PropTypes.oneOf(['left', 'right', 'late']),
};

const mapStateToProps = state => ({
  activeSlide: state.theme.postSlider.final.activeSlide,
  sliderAnimation: state.theme.postSlider.final.sliderAnimation,
});

export default connect(mapStateToProps)(SliderPoints);

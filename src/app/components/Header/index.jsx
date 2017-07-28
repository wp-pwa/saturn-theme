import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectors } from '../../deps';
import TitleBar from './TitleBar';
import NavBar from './NavBar';

import styles from './styles.css';

const Header = ({ currentPost, hiddenBars }) =>
  <div
    className={`${styles.header} ${currentPost ? styles.headerOnPost : ''} ${hiddenBars &&
    currentPost
      ? styles.headerHidden
      : ''}`}
  >
    <TitleBar />
    <NavBar />
  </div>;

Header.propTypes = {
  currentPost: PropTypes.number.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  currentPost: parseInt(selectors.getURLQueries(state).p, 10) || 0,
  hiddenBars: state.theme.postSlider.hiddenBars,
});

export default connect(mapStateToProps)(Header);

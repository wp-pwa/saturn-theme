import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectors } from '../../deps';
import TitleBar from './TitleBar';
import NavBar from './NavBar';

import styles from './styles.css';

const Header = ({ currentPost }) =>
  <div className={`${styles.header} ${currentPost ? styles.headerOnPost : ''}`}>
    <TitleBar />
    <NavBar />
  </div>;

Header.propTypes = {
  currentPost: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  currentPost: parseInt(selectors.getURLQueries(state).p, 10) || 0,
});

export default connect(mapStateToProps)(Header);

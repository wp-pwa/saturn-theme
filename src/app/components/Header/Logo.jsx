import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { selectorCreators } from '../../deps';

import styles from './styles.css';

const Logo = ({ title }) =>
  <div className={styles.logo}>
    <Link to="">
      {title}
    </Link>
  </div>;

Logo.propTypes = {
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: selectorCreators.getSetting('generalApp', 'title')(state),
});

export default connect(mapStateToProps)(Logo);

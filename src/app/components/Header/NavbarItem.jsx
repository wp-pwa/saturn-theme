import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

const NavBarItem = ({ name, active, url }) =>
  <li className={`${styles.navBarItem} ${active && styles.navBarItemActive}`}>
    <Link to={url}>
      {name}
    </Link>
  </li>;

NavBarItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};

export default NavBarItem;

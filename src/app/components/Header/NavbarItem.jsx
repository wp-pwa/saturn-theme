import React, { PropTypes } from 'react';
import styles from './styles.css';

const NavbarItem = ({ name, active }) => (
  <li className={`${styles.navbarItem} ${active && styles.active}`}>
    {name}
  </li>
);

NavbarItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default NavbarItem;

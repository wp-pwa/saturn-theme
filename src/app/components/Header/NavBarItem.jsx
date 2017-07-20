import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as libs from '../../libs';
import styles from './styles.css';

const NavBarItem = ({ name, active, url, mainColor }) => {
  const bnColor = libs.blackOrWhite(mainColor);
  return (
    <li
      className={`${styles.navBarItem}${active ? ` ${styles.navBarItemActive}` : ''}`}
      style={{
        backgroundColor: mainColor,
        color: bnColor,
        borderBottom: active ? `2px solid ${bnColor}` : '',
      }}
    >
      <Link to={url}>
        {name}
      </Link>
    </li>
  );
};

NavBarItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  mainColor: PropTypes.string,
};

export default NavBarItem;

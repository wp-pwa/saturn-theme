import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import * as libs from '../../libs';
import styles from './styles.css';

const NavBarItem = ({ label, active, type, page, category, url, mainColor }) => {
  const bnColor = libs.blackOrWhite(mainColor);
  let link = '';
  if (type === 'page') link = `?page_id=${page}`;
  else if (type === 'category') link = `?cat=${category}`;

  return (

      <li
        className={`${styles.navBarItem} ${active && styles.navBarItemActive}`}
        style={{ backgroundColor: mainColor,
          color: bnColor,
          borderBottom: active ? `2px solid ${bnColor}` : '',
        }}
      >
        {type === 'link' ?
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: bnColor }}
          >
            {label}
          </a> :
          <Link to={link}>
            {label}
          </Link>
        }
      </li>

  );
};

NavBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  type: React.PropTypes.string.isRequired,
  page: React.PropTypes.number,
  category: React.PropTypes.number,
  url: PropTypes.string.isRequired,
  mainColor: PropTypes.string,
};

export default NavBarItem;

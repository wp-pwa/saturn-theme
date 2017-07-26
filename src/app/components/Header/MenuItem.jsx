import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CaptureLinks from '../../elements/CaptureLinks';
import * as libs from '../../libs';
import styles from './styles.css';

const MenuItem = ({ label, type, page, category, tag, url,
  mainColor, currentCat, currentTag, currentAuthor, currentPost }) => {
  const bnColor = libs.blackOrWhite(mainColor);

  let link = '';
  let active = false;

  if (type === 'page') {
    link = `?page_id=${page}`;
  } else if (type === 'category') {
    link = `?cat=${category}`;
    if (currentCat === parseInt(category, 10)) {
      active = true;
    }
  } else if (type === 'tag') {
    link = `?tag=${tag}`;
    if (currentTag === parseInt(tag, 10)) {
      active = true;
    }
  } else if (type === 'Latest posts') {
    active = !currentCat && !currentTag && !currentAuthor && !currentPost;
  }

  if (type === 'link') {
    return (
      <CaptureLinks>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: bnColor }}
        >
          {label}
        </a>
      </CaptureLinks>
    );
  }
  return (
    <Link
      to={link}
      className={`${styles.menuItem} ${active ? styles.menuItemActive : ''}`}
    >
      {label}
    </Link>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  page: React.PropTypes.string,
  category: React.PropTypes.string,
  tag: React.PropTypes.string,
  url: PropTypes.string.isRequired,
  mainColor: PropTypes.string,
  currentCat: PropTypes.number.isRequired,
  currentTag: PropTypes.number.isRequired,
  currentAuthor: PropTypes.number.isRequired,
  currentPost: PropTypes.number.isRequired,
};

export default MenuItem;

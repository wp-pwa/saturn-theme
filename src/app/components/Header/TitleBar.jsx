import React, { PropTypes } from 'react';
import Menu from './Menu';

import styles from './styles.css';

const TitleBar = ({
  categories,
  categoriesList,
  currentCat,
  currentTag,
  currentAuthor,
}) =>
  <div className={styles.titleBar}>
    <Menu
      categories={categories}
      categoriesList={categoriesList}
      currentCat={currentCat}
      currentTag={currentTag}
      currentAuthor={currentAuthor}
    />
    <div className={styles.logo}>
      <span>LOGO</span>
    </div>
  </div>;

TitleBar.propTypes = {
  categories: PropTypes.shape({}).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentCat: PropTypes.number,
  currentTag: PropTypes.number,
  currentAuthor: PropTypes.number,
};

export default TitleBar;

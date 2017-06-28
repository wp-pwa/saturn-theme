import React, { PropTypes } from 'react';
import Menu from './Menu';
import Logo from './Logo';
import Slide from './Slide';
import CloseButton from './CloseButton';

import styles from './styles.css';

const TitleBar = ({
  categories,
  categoriesList,
  currentCat,
  currentTag,
  currentAuthor,
  currentPost,
}) =>
  <div className={`${styles.titleBar} ${currentPost && styles.titleBarHidden}`}>
    <Menu
      categories={categories}
      categoriesList={categoriesList}
      currentCat={currentCat}
      currentTag={currentTag}
      currentAuthor={currentAuthor}
      currentPost={currentPost}
    />
    {currentPost ? <Slide /> : <Logo />}
    {!!currentPost && <CloseButton />}
  </div>;

TitleBar.propTypes = {
  categories: PropTypes.shape({}).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentCat: PropTypes.number,
  currentTag: PropTypes.number,
  currentAuthor: PropTypes.number,
  currentPost: PropTypes.number,
};

export default TitleBar;

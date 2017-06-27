import React, { PropTypes } from 'react';
import { slide as SlideMenu } from 'react-burger-menu';
import { Link } from 'react-router';
import IconMenu from 'react-icons/lib/md/menu';
import IconClose from 'react-icons/lib/md/close';

import styles from './styles.css';

const Menu = ({ categories, categoriesList, currentCat, currentTag, currentAuthor, currentPost }) =>
  <SlideMenu
    isOpen={false}
    customBurgerIcon={<IconMenu />}
    customCrossIcon={<IconClose size={30} />}
    menuClassName={styles.menu}
    burgerButtonClassName={styles.menuButton}
    crossButtonClassName={styles.menuCloseButton}
    itemListClassName={styles.menuList}
  >
    <div className={styles.menuLogo}>LOGO</div>
    {[...new Array(1)].map((id, index) =>
      <Link
        key={`home${index}`}
        to=""
        className={`${styles.menuItem} ${!currentCat &&
          !currentTag &&
          !currentAuthor &&
          !currentPost &&
          styles.menuItemActive}`}
      >
        Home
      </Link>
    )}
    {categoriesList.map((id, index) =>
      <Link
        key={index + 1}
        to={`?cat=${id}`}
        className={`${styles.menuItem} ${currentCat === id && styles.menuItemActive}`}
      >
        {categories[id].name}
      </Link>
    )}
  </SlideMenu>;

Menu.propTypes = {
  categories: PropTypes.shape({}),
  categoriesList: PropTypes.arrayOf(PropTypes.number),
  currentCat: PropTypes.number,
  currentTag: PropTypes.number,
  currentAuthor: PropTypes.number,
  currentPost: PropTypes.number,
};

export default Menu;

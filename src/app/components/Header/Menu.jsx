import React, { PropTypes } from 'react';
import { slide as SlideMenu } from 'react-burger-menu';
import IconMenu from 'react-icons/lib/md/menu';
import IconClose from 'react-icons/lib/md/close';
import MenuItem from './MenuItem';

import styles from './styles.css';

const Menu = ({ menuItemsList, currentCat, currentTag, currentAuthor, currentPost, currentPage }) => (
  <SlideMenu
    isOpen={false}
    customBurgerIcon={<IconMenu size={33} />}
    customCrossIcon={<IconClose size={33} />}
    menuClassName={styles.menu}
    burgerButtonClassName={styles.menuButton}
    crossButtonClassName={styles.menuCloseButton}
    itemListClassName={styles.menuList}
  >
    <div className={styles.menuLogo}>LOGO</div>

    {menuItemsList.map((item, index) =>
      <MenuItem
        key={index}
        currentCat={currentCat}
        currentTag={currentTag}
        currentAuthor={currentAuthor}
        currentPost={currentPost}
        currentPage={currentPage}
        {...item}
      />
    )}
  </SlideMenu>
);

Menu.propTypes = {
  menuItemsList: PropTypes.arrayOf(PropTypes.object),
  currentCat: PropTypes.number,
  currentTag: PropTypes.number,
  currentAuthor: PropTypes.number,
  currentPost: PropTypes.number,
  currentPage: PropTypes.number,
};

export default Menu;

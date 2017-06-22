import React, { PropTypes } from 'react';
import NavBarItem from './NavBarItem';
import { handleNavBarScroll } from '../../helpers';
import styles from './styles.css';

const NavBar = ({ categories, categoriesList, currentCat, currentTag, currentAuthor }) =>
  <div
    className={styles.navBar}
    ref={node => handleNavBarScroll(node, styles)}
  >
    <ul>
      <NavBarItem
        key={0}
        name="Home"
        active={!currentCat && !currentTag && !currentAuthor}
        url=""
      />
      {categoriesList.map((id, index) =>
        <NavBarItem
          key={index + 1}
          name={categories[id].name}
          active={id === currentCat}
          url={`?cat=${id}`}
        />
      )}
    </ul>
  </div>;

NavBar.propTypes = {
  categories: PropTypes.shape({}).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentCat: PropTypes.number,
  currentTag: PropTypes.number,
  currentAuthor: PropTypes.number,
};

export default NavBar;

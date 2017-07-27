import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectors, selectorCreators } from '../../deps';
import * as libs from '../../libs';
import Menu from './Menu';
import Logo from './Logo';
import SliderPoints from './SliderPoints';
import CloseButton from './CloseButton';
import styles from './styles.css';

const TitleBar = ({ menuItemsList, currentCat,
currentTag, currentAuthor, currentPost, mainColor }) => {
  const bnColor = libs.blackOrWhite(mainColor);

  return (
    <div className={`${styles.titleBar}`} style={{ backgroundColor: mainColor, color: bnColor }} >
      <Menu
        menuItemsList={menuItemsList}
        currentCat={currentCat}
        currentTag={currentTag}
        currentAuthor={currentAuthor}
        currentPost={currentPost}
      />
      {currentPost ? <SliderPoints /> : <Logo />}
      {!!currentPost && <CloseButton />}
    </div>
  );
};


TitleBar.propTypes = {
  menuItemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCat: PropTypes.number.isRequired,
  currentTag: PropTypes.number.isRequired,
  currentAuthor: PropTypes.number.isRequired,
  currentPost: PropTypes.number.isRequired,
  mainColor: PropTypes.string,
};

const mapStateToProps = state => ({
  menuItemsList: selectorCreators.getSetting('theme', 'menu')(state),
  currentCat: parseInt(selectors.getURLQueries(state).cat, 10) || 0,
  currentTag: parseInt(selectors.getURLQueries(state).tag, 10) || 0,
  currentAuthor: parseInt(selectors.getURLQueries(state).author, 10) || 0,
  currentPost: parseInt(selectors.getURLQueries(state).p, 10) || 0,
  mainColor: selectorCreators.getSetting('theme', 'mainColor')(state),
});

export default connect(mapStateToProps)(TitleBar);

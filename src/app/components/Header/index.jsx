import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { actions, selectors, selectorCreators } from '../../deps';
import TitleBar from './TitleBar';
import NavBar from './NavBar';

import styles from './styles.css';

const Header = ({
  categories,
  categoriesList,
  currentCat,
  currentTag,
  currentAuthor,
  currentPost,
  isCategoriesReady,
}) =>
  <div className={`${styles.header} ${currentPost && styles.headerOnPost}`}>
    <TitleBar
      categories={categories}
      categoriesList={categoriesList}
      currentCat={currentCat}
      currentTag={currentTag}
      currentAuthor={currentAuthor}
      currentPost={currentPost}
    />
    <NavBar
      categories={categories}
      categoriesList={categoriesList}
      currentCat={currentCat}
      currentTag={currentTag}
      currentAuthor={currentAuthor}
      currentPost={currentPost}
      isCategoriesReady={isCategoriesReady}
    />
  </div>;

Header.propTypes = {
  categories: PropTypes.shape({}).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.number).isRequired,
  isCategoriesReady: PropTypes.bool.isRequired,
  getCategories: PropTypes.func.isRequired, // eslint-disable-line
  currentCat: PropTypes.number.isRequired,
  currentTag: PropTypes.number.isRequired,
  currentAuthor: PropTypes.number.isRequired,
  currentPost: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  categories: selectors.getCategoriesEntities(state),
  categoriesList: selectorCreators.getListResults('allCategories')(state),
  isCategoriesReady: selectorCreators.isListReady('allCategories')(state),
  currentCat: parseInt(selectors.getURLQueries(state).cat, 10) || 0,
  currentTag: parseInt(selectors.getURLQueries(state).tag, 10) || 0,
  currentAuthor: parseInt(selectors.getURLQueries(state).author, 10) || 0,
  currentPost: parseInt(selectors.getURLQueries(state).p, 10) || 0,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () =>
    dispatch(
      actions.newCategoriesListRequested({ name: 'allCategories', params: { per_page: 99 } })
    ),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.getCategories();
    },
  })
)(Header);

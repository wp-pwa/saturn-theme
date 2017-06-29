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
    />
  </div>;

Header.propTypes = {
  categories: PropTypes.shape({}).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.number).isRequired,
  getCategories: PropTypes.func.isRequired, // eslint-disable-line
  currentCat: PropTypes.number,
  currentTag: PropTypes.number,
  currentAuthor: PropTypes.number,
  currentPost: PropTypes.number,
};

const mapStateToProps = state => ({
  categories: selectors.getCategoriesEntities(state),
  categoriesList: selectorCreators.getListResults('allCategories')(state),
  currentCat: parseInt(selectors.getURLQueries(state).cat, 10),
  currentTag: parseInt(selectors.getURLQueries(state).tag, 10),
  currentAuthor: parseInt(selectors.getURLQueries(state).author, 10),
  currentPost: parseInt(selectors.getURLQueries(state).p, 10),
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

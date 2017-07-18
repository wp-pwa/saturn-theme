import React, { PropTypes } from 'react';
import * as libs from '../../libs';
import Menu from './Menu';
import Logo from './Logo';
import Slide from './Slide';
import CloseButton from './CloseButton';

import styles from './styles.css';

class TitleBar extends Component {
  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const {
      categories,
      categoriesList,
      currentCat,
      currentTag,
      currentAuthor,
      currentPost,
    } = this.props;

    return (
      <div className={`${styles.titleBar}`}>
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
      </div>
    );
  }
}

TitleBar.propTypes = {
  categories: PropTypes.shape({}).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentCat: PropTypes.number.isRequired,
  currentTag: PropTypes.number.isRequired,
  currentAuthor: PropTypes.number.isRequired,
  currentPost: PropTypes.number.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categories: selectors.getCategoriesEntities(state),
  categoriesList: selectorCreators.getListResults('allCategories')(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);

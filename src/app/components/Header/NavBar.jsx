/* global screen */ /* eslint consistent-return: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NavBarItem from './NavBarItem';
import { actions, selectors, selectorCreators } from '../../deps';

import styles from './styles.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScrolling: false,
      animation: null,
    };

    this.node = null;
  }

  componentWillMount() {
    this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.categoriesList.length > prevProps.categoriesList.length ||
      (this.props.currentCat !== prevProps.currentCat && !isNaN(prevProps.currentCat))
    ) {
      this.handleScroll();
    }
  }

  handleScroll() {
    if (this.state.isScrolling) this.clearAnimation(this.state.animation);

    // Gets Navbar's DOM node
    const navbar = this.node;

    if (!navbar) return;

    // Finds active category inside Navbar
    const active = navbar.querySelector(`.${styles.navBarItemActive}`);

    if (!active) return;

    // Calculates needed scroll and avialable scroll
    const max = navbar.scrollWidth - screen.width;
    const current = navbar.scrollLeft;
    const needed = active.getBoundingClientRect().left;
    const available = Math.round(max - current < needed ? max - current : needed);
    const step =
      Math.round(available / 20) || Math.round(available / 15) || Math.round(available / 10);

    // If scroll is not needed exits
    if (Math.abs(available) === 0) return;

    let remaining = available;

    // Starts animation
    const animation = setInterval(() => {
      // Returns if not remaining scroll
      if (Math.abs(remaining) === 0) return this.clearAnimation(animation);

      // If remaining scroll is less than one step, scrolls remaining
      if ((available < 0 && remaining - step > 0) || (available > 0 && remaining - step < 0)) {
        navbar.scrollLeft += remaining;
        return this.clearAnimation(animation);
      }

      // Scrolls one step
      navbar.scrollLeft += step;
      remaining -= step;
    }, 7);

    this.setState({
      isScrolling: true,
      animation,
    });
  }

  clearAnimation(animation) {
    clearInterval(animation);

    this.setState({
      isScrolling: false,
      animation: null,
    });
  }

  render() {
    const {
      categories,
      categoriesList,
      currentCat,
      currentTag,
      currentAuthor,
      currentPost,
      isCategoriesReady,
    } = this.props;

    return (
      isCategoriesReady &&
      <div
        className={`${styles.navBar} ${currentPost ? styles.navBarOnPost : ''}`}
        ref={node => (this.node = node)}
      >
        <ul>
          <NavBarItem
            key={0}
            name="Home"
            active={!currentCat && !currentTag && !currentAuthor && !currentPost}
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
      </div>
    );
  }
}

NavBar.propTypes = {
  categories: PropTypes.shape({}).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentCat: PropTypes.number.isRequired,
  currentTag: PropTypes.number.isRequired,
  currentAuthor: PropTypes.number.isRequired,
  currentPost: PropTypes.number.isRequired,
  isCategoriesReady: PropTypes.bool.isRequired,
  getCategories: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

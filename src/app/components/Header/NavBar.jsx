/* global screen */ /* eslint consistent-return: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NavBarItem from './NavBarItem';
import { selectors, selectorCreators } from '../../deps';

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

  componentDidMount() {
    this.handleScroll();
  }

  shouldComponentUpdate(nextProps) {
    const keys = Object.keys(nextProps).filter(item => /current/.test(item));

    for (const key of keys) {
      if (nextProps[key] !== this.props[key]) return true;
    }

    return false;
  }

  componentDidUpdate() {
    this.handleScroll();
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
      menuItemsList,
      currentCat,
      currentTag,
      currentAuthor,
      currentPost,
      mainColor,
    } = this.props;

    return (
      <div
        className={`${styles.navBar} ${currentPost ? styles.navBarOnPost : ''}`}
        style={{ backgroundColor: mainColor }}
        ref={node => (this.node = node)}
      >
        <ul>
          {menuItemsList.map((item, index) =>
            <NavBarItem
              key={index}
              mainColor={mainColor}
              currentCat={currentCat}
              currentTag={currentTag}
              currentAuthor={currentAuthor}
              currentPost={currentPost}
              {...item}
            />
          )}
        </ul>
      </div>
    );
  }
}

NavBar.propTypes = {
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

export default connect(mapStateToProps)(NavBar);

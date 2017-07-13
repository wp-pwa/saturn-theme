import React, { Component, PropTypes } from 'react';
import NavBarItem from './NavBarItem';

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

    const navbar = this.node;
    const active = navbar.querySelector(`.${styles.navBarItemActive}`);

    let dist = Math.round(active.getBoundingClientRect().left);
    const step = Math.round(dist / 20);

    if (Math.abs(dist)) {
      const animation = setInterval(() => {
        if (!Math.abs(dist)) {
          this.clearAnimation(animation);
        } else if ((dist > 0 && dist + step > 0) || (dist < 0 && dist + step < 0)) {
          const currentScroll = navbar.scrollLeft;

          navbar.scrollLeft += step;

          if (currentScroll === navbar.scrollLeft) {
            this.clearAnimation(animation);
          }
        } else {
          navbar.scrollLeft += dist;
          this.clearAnimation(animation);
        }

        dist = Math.round(active.getBoundingClientRect().left);
      }, 7);

      this.setState({
        isScrolling: true,
        animation,
      });
    }
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
};

export default NavBar;

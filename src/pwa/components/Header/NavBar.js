/* global screen */ /* eslint consistent-return: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import NavBarItem from './NavBarItem';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScrolling: false,
      animation: null,
    };

    this.node = null;
    this.ul = null;
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
    const active = navbar.querySelector('.active');

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
      currentPage,
    } = this.props;

    return (
      <Container isPost={currentPost} innerRef={node => (this.node = node)}>
        <List>
          {menuItemsList.map((item, index) =>
            <NavBarItem
              key={index}
              currentCat={currentCat}
              currentTag={currentTag}
              currentAuthor={currentAuthor}
              currentPost={currentPost}
              currentPage={currentPage}
              {...item}
            />
          )}
        </List>
      </Container>
    );
  }
}

NavBar.propTypes = {
  menuItemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCat: PropTypes.number.isRequired,
  currentTag: PropTypes.number.isRequired,
  currentAuthor: PropTypes.number.isRequired,
  currentPost: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  menuItemsList: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
  currentCat: dep('router', 'selectors', 'getId')(state) || 0,
  currentTag: dep('router', 'selectors', 'getId')(state) || 0,
  currentAuthor: dep('router', 'selectors', 'getId')(state) || 0,
  currentPost: dep('router', 'selectors', 'getId')(state) || 0,
  currentPage: dep('router', 'selectors', 'getId')(state) || 0,
});

export default connect(mapStateToProps)(NavBar);

const Container = styled.div`
  height: ${({ theme }) => theme.navbarSize};
  width: 100%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  display: ${({ isPost }) => (isPost ? 'none' : '')};
  background-color: ${({ theme }) => theme.bgColor};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  position: absolute;
  display: flex;
  align-items: center;
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;
`;

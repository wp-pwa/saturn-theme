/* global screen */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import { Motion, spring } from 'react-motion';
import NavItem from './NavItem';
// import * as actions from '../../actions';
import * as selectors from '../../selectors';

class Nav extends Component {
  constructor() {
    super();

    this.scrollPositions = 0;
    this.motion = 0;
  }

  componentDidMount() {
    const maxScroll = this.ref.scrollWidth - screen.width;

    this.scrollPositions = Array.from(this.ref.children).map(child => {
      const scrollPosition = Math.round(child.getBoundingClientRect().left);

      return scrollPosition > maxScroll ? maxScroll : scrollPosition;
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex)
      this.motion = spring(this.scrollPositions[nextProps.activeIndex]);
  }

  handleMotion = ({ x }) => {
    if (!this.ref) return;

    this.ref.scrollLeft = Math.round(x);
  };

  handleScroll = () => {
    if (this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.motion = this.ref.scrollLeft;
    }, 50);
  };

  renderNavItem = (item, index) => {
    const { activeIndex } = this.props;
    const { type, label, url } = item;
    const id = type === 'latest' || type === 'link' ? 0 : parseInt(item[type], 10);

    return (
      <NavItem
        key={index}
        id={id}
        active={activeIndex === index}
        type={type}
        label={label}
        url={url}
      />
    );
  };

  render() {
    const { isPost, menuItems } = this.props;

    return isPost
      ? null
      : <Container innerRef={ref => (this.ref = ref)} onScroll={this.handleScroll}>
          <Motion style={{ x: this.motion }}>
            {x => {
              this.handleMotion(x);
              return null;
            }}
          </Motion>
          {menuItems.map(this.renderNavItem)}
        </Container>;
  }
}

Nav.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeIndex: PropTypes.number.isRequired,
  isPost: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  menuItems: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
  currentType: dep('router', 'selectors', 'getType')(state),
  currentId: dep('router', 'selectors', 'getId')(state),
  activeIndex: selectors.nav.getActive(state),
  isPost: dep('router', 'selectors', 'getType')(state) === 'post'
});

export default connect(mapStateToProps)(Nav);

const Container = styled.ul`
  height: ${({ theme }) => theme.navbarSize};
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.bgColor};
  display: flex;
  align-items: center;
  list-style: none;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

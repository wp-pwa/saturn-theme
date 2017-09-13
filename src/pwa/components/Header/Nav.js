/* global screen, requestAnimationFrame */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import NavItem from './NavItem';
import * as selectors from '../../selectors';

class Nav extends Component {
  constructor() {
    super();

    this.ref = null;
    this.scrollPositions = [];

    this.scrolling = false;
    this.scrollingForward = null;

    this.initialPosition = 0;
    this.scrollDistance = 0;

    this.totalSteps = 20;
    this.currentStep = 0;
  }

  componentDidMount() {
    if (!this.ref) return;

    const maxScroll = this.ref.scrollWidth - screen.width;

    this.scrollPositions = Array.from(this.ref.children).map(child => {
      const scrollPosition = Math.round(child.getBoundingClientRect().left);

      return scrollPosition > maxScroll ? maxScroll : scrollPosition;
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeIndex === this.props.activeIndex) return;
    if (!this.ref) return;

    this.currentStep = 0;
    this.initialPosition = this.ref.scrollLeft;
    const nextPosition = this.scrollPositions[this.props.activeIndex];

    this.scrollingForward = this.initialPosition < nextPosition;
    this.scrollDistance = Math.abs(this.initialPosition - nextPosition);

    this.totalSteps =
      (Math.abs(this.scrollDistance / 20) && 20) ||
      (Math.abs(this.scrollDistance / 15) && 15) ||
      10;

    this.scrolling = true;

    if (this.scrollDistance) requestAnimationFrame(this.handleStep);
  }

  getStepPosition = () => {
    const t = 1 / this.totalSteps * this.currentStep;
    const value = t * (2 - t);

    return value * this.scrollDistance;
  };

  handleStep = () => {
    if (!this.scrolling) return;

    this.currentStep += 1;

    const stepPosition = this.getStepPosition();

    if (this.scrollingForward) this.ref.scrollLeft = this.initialPosition + stepPosition;
    else this.ref.scrollLeft = this.initialPosition - stepPosition;

    if (this.scrollDistance !== stepPosition) requestAnimationFrame(this.handleStep);
    else this.scrolling = false;
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
    const { menuItems } = this.props;

    return (
      <Container innerRef={ref => (this.ref = ref)} onScroll={this.handleScroll}>
        {menuItems.map(this.renderNavItem)}
      </Container>
    );
  }
}

Nav.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeIndex: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  menuItems: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
  currentType: dep('router', 'selectors', 'getType')(state),
  currentId: dep('router', 'selectors', 'getId')(state),
  activeIndex: selectors.nav.getActive(state)
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

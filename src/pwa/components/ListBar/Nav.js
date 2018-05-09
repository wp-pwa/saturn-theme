import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import NavItem from './NavItem';
import { Container } from '../../../shared/styled/ListBar/Nav';
import { home } from '../../contexts';

class Nav extends PureComponent {
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

    this.renderNavItem = this.renderNavItem.bind(this);
    this.handleStep = this.handleStep.bind(this);
    this.scrollSetup = this.scrollSetup.bind(this);
    this.getStepPosition = this.getStepPosition.bind(this);
  }

  componentDidMount() {
    if (!this.ref) return;

    const maxScroll = this.ref.scrollWidth - window.screen.width;

    this.scrollPositions = Array.from(this.ref.children).map(child => {
      const scrollPosition = Math.round(child.getBoundingClientRect().left);

      return scrollPosition > maxScroll ? maxScroll : scrollPosition;
    });

    this.scrollSetup();

    if (this.scrollDistance) window.requestAnimationFrame(this.handleStep);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeIndex === this.props.activeIndex) return;
    if (!this.ref) return;
    this.scrollSetup();

    if (this.scrollDistance) window.requestAnimationFrame(this.handleStep);
  }

  getStepPosition() {
    const t = 1 / this.totalSteps * this.currentStep;
    const value = t * (2 - t);

    return value * this.scrollDistance;
  }

  scrollSetup() {
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
  }

  handleStep() {
    if (!this.scrolling) return;

    this.currentStep += 1;

    const stepPosition = this.getStepPosition();

    if (this.scrollingForward) this.ref.scrollLeft = this.initialPosition + stepPosition;
    else this.ref.scrollLeft = this.initialPosition - stepPosition;

    if (this.scrollDistance !== stepPosition) window.requestAnimationFrame(this.handleStep);
    else this.scrolling = false;
  }

  renderNavItem(item, index) {
    const { menu, context } = this.props;
    const { type, label, url } = item;
    const id = type === 'latest' || type === 'link' ? 'post' : parseInt(item[type], 10);
    const page = type !== 'post' && type !== 'page' ? 1 : null;

    return (
      <NavItem
        menu={menu}
        context={context}
        key={index}
        id={id}
        type={type}
        page={page}
        label={label}
        url={url}
      />
    );
  }

  render() {
    const { menu } = this.props;

    return (
      <Container
        innerRef={ref => {
          this.ref = ref;
        }}
        onScroll={this.handleScroll}
      >
        {menu.map(this.renderNavItem)}
      </Container>
    );
  }
}

Nav.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.object).isRequired,
  context: PropTypes.shape({}).isRequired,
  activeIndex: PropTypes.number,
};

Nav.defaultProps = {
  activeIndex: null,
};

export default inject(({ connection, settings }) => {
  const { type, id } = connection.selectedItem;
  const { bar } = connection.selectedContext.options;
  const { menu } = settings.theme;

  let activeIndex;

  if (bar === 'single') activeIndex = null;
  else if (type === 'latest') activeIndex = 0;
  else activeIndex = menu.findIndex(item => item.type === type && item[type] === id.toString());

  return {
    menu,
    context: home(menu),
    activeIndex,
  };
})(Nav);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import NavItem from './NavItem';

class NavList extends Component {
  renderNavItem = (item, index) => {
    const { currentType, currentId } = this.props;
    const { type, label, url } = item;
    const id = type === 'latest' || type === 'link' ? 0 : parseInt(item[type], 10);
    const active = type === currentType && id === currentId;

    return <NavItem key={index} id={id} active={active} type={type} label={label} url={url} />;
  };

  render = () =>
    <Container>
      {this.props.menuItems.map(this.renderNavItem)}
    </Container>;
}

NavList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentType: PropTypes.string.isRequired,
  currentId: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  menuItems: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
  currentType: dep('router', 'selectors', 'getType')(state),
  currentId: dep('router', 'selectors', 'getId')(state)
});

export default connect(mapStateToProps)(NavList);

const Container = styled.ul`
  position: absolute;
  display: flex;
  align-items: center;
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;
`;

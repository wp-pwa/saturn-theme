import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import MenuItem from './MenuItem';
import { Container } from '../../../shared/styled/Menu/MenuList';
import { home } from '../../contexts';

class MenuList extends Component {
  static renderMenuItem(item, index) {
    const { type, label, url } = item;

    let id;

    if (type === 'latest') {
      id = 'post';
    } else if (type === 'link') {
      id = 'link';
    } else {
      id = parseInt(item[type], 10);
    }

    const page = type !== 'post' && type !== 'page' ? 1 : null;

    return <MenuItem key={index} id={id} type={type} page={page} label={label} url={url} />;
  }

  render() {
    return <Container>{this.props.menuItems.map(MenuList.renderMenuItem)}</Container>;
  }
}

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const menuItems = dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state);

  return {
    menuItems,
    context: home(menuItems),
  };
};

export default connect(mapStateToProps)(MenuList);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import MenuItem from './MenuItem';
import { Container } from '../../../shared/styled/Menu/MenuList';
import { home } from '../../contexts';
import Gdpr from '../Gdpr';

class MenuList extends Component {
  constructor() {
    super();

    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  renderMenuItem(item, index) {
    const { type, label, url, target } = item;
    const { context } = this.props;

    let id;

    if (type === 'latest') {
      id = 'post';
    } else if (type === 'link') {
      id = 'link';
    } else {
      id = parseInt(item[type], 10);
    }

    const page = type !== 'post' && type !== 'page' ? 1 : null;

    return (
      <MenuItem
        key={index}
        type={type}
        id={id}
        page={page}
        label={label}
        url={url}
        target={target}
        context={context}
      />
    );
  }

  render() {
    return (
      <Container>
        {this.props.menuItems.map(this.renderMenuItem)}
        <Gdpr />
      </Container>
    );
  }
}

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  context: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => {
  const menuItems = dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state);

  return {
    menuItems,
    context: home(menuItems),
  };
};

export default connect(mapStateToProps)(MenuList);

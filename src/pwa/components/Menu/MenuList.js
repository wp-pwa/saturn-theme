import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import MenuItem from './MenuItem';
import { Container } from '../../../shared/styled/Menu/MenuList';
import { home } from '../../../shared/contexts';
import GdprButton from '../Gdpr/GdprButton';
import NotificationsSwitch from '../NotificationsSwitch';

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
        <GdprButton />
        <NotificationsSwitch />
      </Container>
    );
  }
}

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  context: PropTypes.shape({}).isRequired,
};

export default inject(({ stores: { settings } }) => ({
  menuItems: settings.theme.menu,
  context: home(settings.theme.menu),
}))(MenuList);

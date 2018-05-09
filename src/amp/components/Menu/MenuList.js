import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import MenuItem from './MenuItem';
import { Container } from '../../../shared/styled/Menu/MenuList';

class MenuList extends Component {
  constructor() {
    super();

    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  renderMenuItem(item, index) {
    const { currentId, currentType, siteUrl } = this.props;

    let id;
    let url = null;

    if (item.type === 'latest') {
      id = 'post';
      url = siteUrl;
    } else if (item.type === 'link') {
      id = 'link';
      ({ url } = item);
    } else {
      id = parseInt(item[item.type], 10);
      if (!['post', 'page', 'category', 'tag'].includes(item.type)) url = siteUrl;
    }

    const active = item.type === currentType && id === currentId;

    return (
      <MenuItem key={index} id={id} type={item.type} active={active} label={item.label} url={url} />
    );
  }

  render() {
    return <Container isAmp>{this.props.menuItems.map(this.renderMenuItem)}</Container>;
  }
}

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currentType: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
};

export default inject(({ connection, settings }) => ({
  currentType: connection.selectedItem.type,
  currentId: connection.selectedItem.id,
  menuItems: settings.theme.menu,
  siteUrl: settings.generalSite.url,
}))(MenuList);

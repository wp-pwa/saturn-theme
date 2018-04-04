import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import MenuItem from './MenuItem';
import { Container } from '../../../shared/styled/Menu/MenuList';

class MenuList extends Component {
  renderMenuItem = (item, index) => {
    const { currentId, currentType } = this.props;
    const { type, label, url } = item;

    let id;

    if (type === 'latest') {
      id = 'post';
    } else if (type === 'link') {
      id = 'link';
    } else {
      id = parseInt(item[type], 10);
    }

    const active = type === currentType && id === currentId;

    return <MenuItem key={index} id={id} active={active} type={type} label={label} url={url} />;
  };

  render() {
    return <Container>{this.props.menuItems.map(this.renderMenuItem)}</Container>;
  }
}

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currentType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  menuItems: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => ({
    currentType: connection.selectedItem.type,
    currentId: connection.selectedItem.id,
  })),
)(MenuList);

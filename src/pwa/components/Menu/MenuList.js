import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import MenuItem from './MenuItem';

class MenuList extends Component {
  renderMenuItem = (item, index) => {
    const { selectedId, selectedType } = this.props;
    const { type, label, url } = item;

    let id;

    if (type === 'latest') {
      id = 'post';
    } else if (type === 'link') {
      id = 'link';
    } else {
      id = parseInt(item[type], 10);
    }

    const active = type === selectedType && id === selectedId;

    return <MenuItem key={index} id={id} active={active} type={type} label={label} url={url} />;
  };

  render() {
    return <Container>{this.props.menuItems.map(this.renderMenuItem)}</Container>;
  }
}

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  menuItems: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state)
});

export default compose(
  connect(mapStateToProps),
  inject(stores => ({
    selectedType: stores.connection.selected.type,
    selectedId: stores.connection.selected.id
  }))
)(MenuList);

const Container = styled.ul`
  box-sizing: border-box;
  width: 100%;
  height: ${({ theme }) => `calc(100% - ${theme.titleSize})`};
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: ${({ theme }) => theme.titleSize};
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &:-webkit-scrollbar {
    display: none;
  }
`;

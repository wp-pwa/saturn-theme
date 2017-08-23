import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems, currentId, currentType }) =>
  <Container>
    {menuItems.map((item, index) => {
      const id = item.type === 'latest' || item.type === 'link' ? 0 : parseInt(item[item.type], 10);
      const active = item.type === currentType && id === currentId;

      return (
        <MenuItem
          key={index}
          id={id}
          active={active}
          type={item.type}
          label={item.label}
          url={item.url}
        />
      );
    })}
  </Container>;

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentId: PropTypes.number.isRequired,
  currentType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  menuItems: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
  currentId: dep('router', 'selectors', 'getId')(state),
  currentType: dep('router', 'selectors', 'getType')(state)
});

export default connect(mapStateToProps)(MenuList);

const Container = styled.ul`
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - ${({ theme }) => theme.titleSize});
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &:-webkit-scrollbar {
    display: none;
  }
`;

import React, { PropTypes } from 'react';
import { slide as SideMenu } from 'react-burger-menu';
import IconMenu from 'react-icons/lib/md/menu';
import IconClose from 'react-icons/lib/md/close';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const Menu = ({
  menuItemsList,
  currentCat,
  currentTag,
  currentAuthor,
  currentPost,
  currentPage,
  title,
}) =>
  <StyledSideMenu
    isOpen={false}
    customBurgerIcon={<IconMenu size={33} />}
    customCrossIcon={<IconClose size={33} />}
  >
    <Logo>
      {title}
    </Logo>
    {menuItemsList.map((item, index) =>
      <MenuItem
        key={index}
        currentCat={currentCat}
        currentTag={currentTag}
        currentAuthor={currentAuthor}
        currentPost={currentPost}
        currentPage={currentPage}
        {...item}
      />
    )}
  </StyledSideMenu>;

const StyledSideMenu = styled(SideMenu)`
  .bm-menu::-webkit-scrollbar {
    display: none;
  }

  & + .bm-burger-button {
    box-sizing: border-box;
    height: ${props => props.theme.titleSize};
    width: ${props => props.theme.titleSize};
    padding: 12px;
    padding-right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bm-cross-button {
    box-sizing: border-box;
    color: #333;
    width: ${props => props.theme.titleSize} !important;
    height: ${props => props.theme.titleSize} !important;
    top: 0 !important;
    right: 0 !important;
    padding: 12px;
  }

  .bm-item-list {
    background-color: #FFF;
    margin: 0;
    padding: 0;
    padding-top: ${props => props.theme.titleSize};
    border: none;
    box-sizing: border-box;
    min-height: 100%;
    height: auto !important;
  }
`;

const Logo = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: 300px;
  top: 0;
  color: #000;
  background-color: #fff;
  padding-left: ${props => props.theme.menuPaddingLeft};
  height: ${props => props.theme.titleSize};
  line-height: ${props => props.theme.titleSize};
  font-size: ${props => props.theme.logoSize};
`;

Menu.propTypes = {
  menuItemsList: PropTypes.arrayOf(PropTypes.object),
  currentCat: PropTypes.number,
  currentTag: PropTypes.number,
  currentAuthor: PropTypes.number,
  currentPost: PropTypes.number,
  currentPage: PropTypes.number,
  title: PropTypes.string,
};

export default Menu;

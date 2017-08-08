import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';
import styled from 'styled-components';
import Logo from '../Header/Logo';
import MenuItem from './MenuItem';
import { selectors, selectorCreators } from '../../deps';
import * as actions from '../../actions';

const Menu = ({
  isOpen,
  menuItemsList,
  currentCat,
  currentTag,
  currentAuthor,
  currentPost,
  currentPage,
  menuHasClosed,
}) =>
  <Container isOpen={isOpen}>
    <Overlay
      onClick={() => {
        menuHasClosed();
      }}
      onTouchMove={() => {
        menuHasClosed();
      }}
    />
    <InnerContainer isOpen={isOpen}>
      <Header>
        <Logo />
        <CloseButton>
          <IconClose
            size={33}
            onClick={() => {
              menuHasClosed();
            }}
          />
        </CloseButton>
      </Header>
      <Body>
        <List>
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
        </List>
      </Body>
    </InnerContainer>
  </Container>;

Menu.propTypes = {
  menuItemsList: PropTypes.arrayOf(PropTypes.object),
  currentCat: PropTypes.number,
  currentTag: PropTypes.number,
  currentAuthor: PropTypes.number,
  currentPost: PropTypes.number,
  currentPage: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  menuHasClosed: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menuItemsList: selectorCreators.getSetting('theme', 'menu')(state),
  currentCat: parseInt(selectors.getURLQueries(state).cat, 10) || 0,
  currentTag: parseInt(selectors.getURLQueries(state).tag, 10) || 0,
  currentAuthor: parseInt(selectors.getURLQueries(state).author, 10) || 0,
  currentPost: parseInt(selectors.getURLQueries(state).p, 10) || 0,
  currentPage: parseInt(selectors.getURLQueries(state).page_id, 10) || 0,
  isOpen: state.theme.menu.isOpen,
});

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? 0 : '-100%')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 150;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? 0 : '-100%')};
  width: 80vw;
  height: 100%;
  background-color: #fff;
  transition: left 0.3s ease;
  z-index: 151;
`;

const Header = styled.div`
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
`;

const Body = styled.div`
  width: 100%;
  height: calc(100% - ${({ theme }) => theme.titleSize});
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &:-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CloseButton = styled.div`
  width: ${({ theme }) => theme.titleSize};
  height: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
`;

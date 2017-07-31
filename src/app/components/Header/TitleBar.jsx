import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectors, selectorCreators } from '../../deps';
import Menu from './Menu';
import Logo from './Logo';
import SliderPoints from './SliderPoints';
import CloseButton from './CloseButton';

const TitleBar = ({
  menuItemsList,
  currentCat,
  currentTag,
  currentAuthor,
  currentPost,
  currentPage,
  title,
}) =>
  <Container>
    <Menu
      menuItemsList={menuItemsList}
      currentCat={currentCat}
      currentTag={currentTag}
      currentAuthor={currentAuthor}
      currentPost={currentPost}
      currentPage={currentPage}
      title={title}
    />
    {currentPost ? <SliderPoints /> : <Logo />}
    {!!currentPost && <CloseButton />}
  </Container>;

const Container = styled.div`
  box-sizing: border-box;
  height: ${props => props.theme.titleSize};
  width: 100%;
  display: flex;
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.bgColor};
`;

TitleBar.propTypes = {
  menuItemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCat: PropTypes.number.isRequired,
  currentTag: PropTypes.number.isRequired,
  currentAuthor: PropTypes.number.isRequired,
  currentPost: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  title: PropTypes.string,
};

const mapStateToProps = state => ({
  menuItemsList: selectorCreators.getSetting('theme', 'menu')(state),
  currentCat: parseInt(selectors.getURLQueries(state).cat, 10) || 0,
  currentTag: parseInt(selectors.getURLQueries(state).tag, 10) || 0,
  currentAuthor: parseInt(selectors.getURLQueries(state).author, 10) || 0,
  currentPost: parseInt(selectors.getURLQueries(state).p, 10) || 0,
  currentPage: parseInt(selectors.getURLQueries(state).page_id, 10) || 0,
  title: selectorCreators.getSetting('generalApp', 'title')(state),
});

export default connect(mapStateToProps)(TitleBar);

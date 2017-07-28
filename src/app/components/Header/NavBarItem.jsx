/* eslint no-confusing-arrow: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const NavBarItem = ({
  label,
  type,
  page,
  category,
  tag,
  url,
  currentCat,
  currentTag,
  currentAuthor,
  currentPost,
  currentPage,
}) => {
  let link = '';
  let active = false;

  switch (type) {
    case 'Latest posts':
      active = !currentPage && !currentCat && !currentTag && !currentAuthor && !currentPost;
      break;
    case 'category':
      link = `?cat=${category}`;
      if (currentCat === parseInt(category, 10)) active = true;
      break;
    case 'tag':
      link = `?tag=${tag}`;
      if (currentTag === parseInt(tag, 10)) active = true;
      break;
    case 'page':
      link = `?page_id=${page}`;
      if (currentPage === parseInt(page, 10)) active = true;
      break;
    default:
  }

  return (
    <Item active={active} className={active ? 'active' : ''}>
      {type === 'link'
        ? <a href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
        : <Link to={link}>
          {label}
        </Link>}
    </Item>
  );
};

NavBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  page: React.PropTypes.string,
  category: React.PropTypes.string,
  tag: React.PropTypes.string,
  url: PropTypes.string.isRequired,
  currentCat: PropTypes.number.isRequired,
  currentTag: PropTypes.number.isRequired,
  currentAuthor: PropTypes.number.isRequired,
  currentPost: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

const Item = styled.li`
  box-sizing: border-box;
  flex-shrink: 0;
  height: 100%;
  background-color: ${props => props.theme.bgColor};
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${props =>
      props.active ? props.theme.color : 'rgba(153, 153, 153, 0)'};

  a {
    color: ${props => props.theme.color} !important;
    font-weight: 400;
    font-size: 0.9rem;
    padding: 0 17px;
    text-decoration: none;
    text-transform: uppercase;
    height: 100%;
    display: flex;
    align-items: center;
    opacity: inherit !important;
  }
`;

export default NavBarItem;

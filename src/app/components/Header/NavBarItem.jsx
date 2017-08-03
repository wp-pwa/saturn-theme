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
    <ListItem active={active} className={active ? 'active' : ''}>
      {type === 'link'
        ? <ExternalLink href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </ExternalLink>
        : <StyledLink to={link}>
          {label}
        </StyledLink>}
    </ListItem>
  );
};

const ListItem = styled.li`
  box-sizing: border-box;
  flex-shrink: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.bgColor};
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.color : 'rgba(153, 153, 153, 0)')};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color} !important;
  font-weight: 400;
  font-size: 0.9rem;
  padding: 0 17px;
  text-decoration: none;
  text-transform: uppercase;
  height: 100%;
  display: flex;
  align-items: center;
  opacity: inherit !important;
`;

const ExternalLink = StyledLink.extend``;

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

export default NavBarItem;

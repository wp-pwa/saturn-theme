import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const MenuItem = ({
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

  if (type === 'link') {
    return (
      <ExternalLink href={url} target="_blank" rel="noopener noreferrer">
        {label}
      </ExternalLink>
    );
  }

  return active
    ? <ActiveLink to={link}>
      {label}
    </ActiveLink>
    : <StyledLink to={link}>
      {label}
    </StyledLink>;
};

const StyledLink = styled(Link)`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  padding: 10px;
  padding-left: ${({ theme }) => theme.menuPaddingLeft};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  color: #999 !important;
  font-weight: normal;
  border-left: 3px solid transparent;
`;

const ActiveLink = StyledLink.extend`
  color: #333 !important;
  font-weight: bold;
  border-left: 3px solid #333;
`;

const ExternalLink = StyledLink.extend``;

MenuItem.propTypes = {
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

export default MenuItem;

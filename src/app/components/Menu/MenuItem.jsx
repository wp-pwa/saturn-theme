import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import * as actions from '../../actions';

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
  menuHasClosed,
}) => {
  let link = '';
  let active = false;

  switch (type) {
    case 'Latest posts':
    case 'blog_home':
      active = !currentCat && !currentPage && !currentTag && !currentAuthor && !currentPost;
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
      <ExternalLink
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          menuHasClosed();
        }}
      >
        {label}
      </ExternalLink>
    );
  }

  return active
    ? <ActiveLink
      to={link}
      onClick={() => {
        menuHasClosed();
      }}
    >
      {label}
    </ActiveLink>
    : <StyledLink
      to={link}
      onClick={() => {
        menuHasClosed();
      }}
    >
      {label}
    </StyledLink>;
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  category: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  url: PropTypes.string,
  currentCat: PropTypes.number.isRequired,
  currentTag: PropTypes.number.isRequired,
  currentAuthor: PropTypes.number.isRequired,
  currentPost: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  menuHasClosed: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed()),
});

export default connect(null, mapDispatchToProps)(MenuItem);

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
  text-decoration: none;
  color: #333;
`;

const ActiveLink = StyledLink.extend`
  color: #333 !important;
  font-weight: bold;
  border-left: 3px solid #333;
`;

const ExternalLink = StyledLink.extend``;

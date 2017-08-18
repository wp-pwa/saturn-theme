import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import * as actions from '../../actions';

const MenuItem = ({
  Link,
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
      <A
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          menuHasClosed();
        }}
      >
        {label}
      </A>
    );
  }

  return active
    ? <Link
      to={link}
      onClick={() => {
        menuHasClosed();
      }}
    >
        <ActiveA>
          {label}
        </ActiveA>
      </Link>
    : <Link
      to={link}
      onClick={() => {
        menuHasClosed();
      }}
    >
        <A>
          {label}
        </A>
      </Link>;
};

MenuItem.propTypes = {
  Link: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
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

const mapStateToProps = () => ({
  Link: dep('router', 'components', 'Link'),
});

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);

const A = styled.a`
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

const ActiveA = A.extend`
  color: #333 !important;
  font-weight: bold;
  border-left: 3px solid #333;
`;

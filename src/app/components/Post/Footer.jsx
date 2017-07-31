import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
// import Comments from '../Comments';

const Footer = ({ categories, tags }) =>
  <PostFooter>
    <Categories>
      {categories.map(category =>
        <Category key={category.id}>
          <StyledLink to={`?cat=${category.id}`}>
            {category.name}
          </StyledLink>
        </Category>
      )}
      {tags.map(tag =>
        <Category key={tag.id}>
          <StyledLink to={`?tag=${tag.id}`}>
            {tag.name}
          </StyledLink>
        </Category>
      )}
    </Categories>
  </PostFooter>;
// <Comments disqusShortname={'adslzone'} />

const PostFooter = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
`;

const Categories = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 3px;
`;

const Category = styled.span`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  margin: 5px;
  background-color: rgba(70, 130, 180, 0.8);
  color: ${({ theme }) => theme.postLight};
  box-shadow: 1px 1px 1px 0 ${({ theme }) => theme.shadowColor};
`;

const StyledLink = styled(Link)`
  white-space: nowrap;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

Footer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default Footer;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'styled-components';
// import Comments from '../Comments';

const Footer = ({ Link, categories, tags }) =>
  <PostFooter>
    <Categories>
      {categories.map(category =>
        <Category key={category.id}>
          <Link type="category" id={category.id}>
            <A>
              {category.name}
            </A>
          </Link>
        </Category>
      )}
      {tags.map(tag =>
        <Category key={tag.id}>
          <Link type="tag" id={tag.id}>
            <A>
              {tag.name}
            </A>
          </Link>
        </Category>
      )}
    </Categories>
    {/* <Comments disqusShortname={'adslzone'} /> */}
  </PostFooter>;

Footer.propTypes = {
  Link: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(Footer);

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
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
  box-shadow: 1px 1px 1px 0 ${({ theme }) => theme.shadowColor};
`;

const A = styled.a`
  white-space: nowrap;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

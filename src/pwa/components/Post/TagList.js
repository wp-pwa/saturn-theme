import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TagItem from './TagItem';
import * as selectorCreators from '../../selectorCreators';

class TagList extends Component {
  renderCategories = id => <TagItem key={id} id={id} type={'category'} />;
  renderTags = id => <TagItem key={id} id={id} type={'tag'} />;

  render() {
    return (
      <Container>
        {this.props.categoryList.map(this.renderCategories)}
        {this.props.tagList.map(this.renderTags)}
      </Container>
    );
  }
}

TagList.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.number).isRequired,
  tagList: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const mapStateToProps = (state, { id }) => ({
  categoryList: selectorCreators.post.getCategoryList(id)(state),
  tagList: selectorCreators.post.getTagList(id)(state),
});

export default connect(mapStateToProps)(TagList);

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 0;
  margin: 0 10px;
  border-top: 1px solid #ddd;
`;

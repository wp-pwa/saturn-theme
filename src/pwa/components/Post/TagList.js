import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import styled from "react-emotion";
import TagItem from "./TagItem";

class TagList extends Component {
  static propTypes = {
    categoryList: PropTypes.shape({}),
    tagList: PropTypes.shape({}),
  };

  static defaultProps = {
    categoryList: null,
    tagList: null,
  };

  static renderCategories({ id }) {
    return <TagItem key={id} id={id} type="category" />;
  }

  static renderTags({ id }) {
    return <TagItem key={id} id={id} type="tag" />;
  }

  render() {
    const { categoryList, tagList } = this.props;
    return (
      <Container>
        {categoryList && categoryList.map(TagList.renderCategories)}
        {tagList && tagList.map(TagList.renderTags)}
      </Container>
    );
  }
}

export default inject(({ connection }, { id }) => ({
  categoryList: connection.single.post[id].taxonomies.category,
  tagList: connection.single.post[id].taxonomies.tag,
}))(TagList);

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding: 25px 10px;
  border-bottom: 1px solid #eee;
`;

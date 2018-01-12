import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container, Item } from '../../../shared/styled/Post/TagList';

const TagList = ({ categoryList, tagList }) => {
  const list = categoryList.concat(tagList);

  return list ? (
    <Container>
      {list.map(({ id, name, _link }) => (
        <Item key={id}>
          <a href={_link}>{name}</a>
        </Item>
      ))}
    </Container>
  ) : null;
};

TagList.propTypes = {
  categoryList: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  tagList: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array])
};

TagList.defaultProps = {
  categoryList: [],
  tagList: []
};

export default inject(({ connection }, { id }) => ({
  categoryList: connection.single.post[id].taxonomies.category,
  tagList: connection.single.post[id].taxonomies.tag
}))(TagList);

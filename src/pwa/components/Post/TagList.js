/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import { Container, Item } from '../../../shared/styled/Post/TagList';
import * as selectors from '../../selectors';

const TagList = ({ categoryList, tagList, context, Link }) => {
  const list = categoryList.concat(tagList);

  return list ? (
    <Container>
      {list.map(({ id, name, taxonomy }) => (
        <Item key={id} id={id} alt={name}>
          <Link
            selected={{ listType: taxonomy, listId: id }}
            context={context}
            event={{ category: 'TagList in Post', action: 'navigate' }}
          >
            <a dangerouslySetInnerHTML={{ __html: name }} />
          </Link>
        </Item>
      ))}
    </Container>
  ) : null;
};

TagList.propTypes = {
  categoryList: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  tagList: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  context: PropTypes.shape({}).isRequired,
  Link: PropTypes.func.isRequired,
};

TagList.defaultProps = {
  categoryList: [],
  tagList: [],
};

const mapStateToProps = state => ({
  context: selectors.contexts.home(state),
  Link: dep('connection', 'components', 'Link'),
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id }) => ({
    categoryList: connection.single.post[id].taxonomies.category,
    tagList: connection.single.post[id].taxonomies.tag,
  })),
)(TagList);

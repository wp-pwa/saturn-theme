/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import { Container, Item } from '../../../shared/styled/Post/TagList';
import { home } from '../../contexts';

const TagList = ({ categoryList, tagList, context, Link, rtl }) => {
  const list = categoryList.concat(tagList);

  return list ? (
    <Container rtl={rtl}>
      {list.map(({ id, name, taxonomy }) => (
        <Item key={id} id={id} alt={name} rtl={rtl}>
          <Link
            selected={{ listType: taxonomy, listId: id }}
            context={context}
            event={{ category: 'Post', action: 'open list' }}
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
  rtl: PropTypes.bool,
};

TagList.defaultProps = {
  categoryList: [],
  tagList: [],
  rtl: false,
};

const mapStateToProps = state => {
  const menu = dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state);
  const localisation =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'localisation')(state) || {};

  return {
    context: home(menu),
    Link: dep('connection', 'components', 'Link'),
    rtl: localisation.rtl,
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id }) => ({
    categoryList: connection.single.post[id].taxonomies.category,
    tagList: connection.single.post[id].taxonomies.tag,
  })),
)(TagList);

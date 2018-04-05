import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import { Container } from '../../../shared/styled/ListBar/NavItem';

const NavItem = ({ label, type, isSelected, url, Link, item, context }) => {
  if (type === 'link') {
    return (
      <Container>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </Container>
    );
  }

  return (
    <Container isSelected={isSelected}>
      <Link
        item={item}
        context={context}
        event={{
          category: 'Navbar',
          action: ['page', 'post'].includes(type) ? 'open single' : 'open list',
        }}
      >
        <a>{isSelected ? <h1>{label}</h1> : label}</a>
      </Link>
    </Container>
  );
};

NavItem.propTypes = {
  Link: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  item: PropTypes.shape({}),
  url: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  context: PropTypes.shape({}).isRequired,
};

NavItem.defaultProps = {
  url: null,
  item: null,
};

const mapStateToProps = (state, { id, type }) => {
  const item = {};

  if (type !== 'link') {
    item.type = type;
    item.id = id;

    if (['latest', 'author', 'tag', 'category'].includes(type)) {
      item.page = 1;
    }
  }

  return {
    Link: dep('connection', 'components', 'Link'),
    item,
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { type, id, page = 1 }) => {
    const item = connection.selectedContext.getItem({ item: { type, id, page } });
    return {
      isSelected: !!item && item.isSelected,
    };
  }),
)(NavItem);

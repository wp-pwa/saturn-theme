import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import { Container } from '../../../shared/styled/ListBar/NavItem';

const NavItem = ({ label, type, id, isSelected, url, Link, context }) => {
  if (type === 'link') {
    return (
      <Container>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </Container>
    );
  }

  const item = {
    type,
    id,
  };

  if (['latest', 'author', 'tag', 'category'].includes(type)) item.page = 1;

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
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  context: PropTypes.shape({}).isRequired,
  Link: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

NavItem.defaultProps = {
  url: null,
};

export default compose(
  inject(({ connection }, { type, id }) => ({
    Link: dep('connection', 'components', 'Link'),
    isSelected: computed(
      () => connection.selectedItem.type === type && connection.selectedItem.id === id,
    ).get(),
  })),
)(NavItem);

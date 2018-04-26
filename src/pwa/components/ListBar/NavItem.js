import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
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

  return (
    <Container isSelected={isSelected}>
      <Link
        type={type}
        id={id}
        page={['latest', 'author', 'tag', 'category'].includes(type) ? 1 : null}
        context={context}
        eventCategory="Navbar"
        eventAction={['page', 'post'].includes(type) ? 'open single' : 'open list'}
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

export default inject(({ connection }, { type, id }) => ({
  Link: dep('connection', 'components', 'Link'),
  isSelected: computed(
    () => connection.selectedItem.type === type && connection.selectedItem.id === id,
  ).get(),
}))(NavItem);

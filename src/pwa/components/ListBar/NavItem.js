/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import Link from '../Link';
import { Container } from '../../../shared/styled/ListBar/NavItem';

const NavItem = ({ label, type, id, isSelected, url, context, target }) => {
  if (type === 'link') {
    return (
      <Container>
        <a href={url} target={target} rel="noopener noreferrer">
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
        eventAction={
          ['page', 'post'].includes(type) ? 'open single' : 'open list'
        }
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
  target: PropTypes.string,
  context: PropTypes.shape({}).isRequired,
  isSelected: PropTypes.bool.isRequired,
};

NavItem.defaultProps = {
  url: null,
  target: '_blank',
};

export default inject(({ stores: { connection } }, { type, id }) => ({
  isSelected: computed(
    () =>
      connection.selectedItem.type === type &&
      connection.selectedItem.id === id,
  ).get(),
}))(NavItem);

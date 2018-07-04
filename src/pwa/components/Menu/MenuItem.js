/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import Link from '../Link';
import { Container } from '../../../shared/styled/Menu/MenuItem';

const MenuItem = ({
  type,
  id,
  context,
  label,
  isSelected,
  url,
  target,
  menuHasClosed,
}) => {
  if (type === 'link') {
    return (
      <Container onClick={menuHasClosed}>
        <a href={url} target={target} rel="noopener noreferrer">
          {label}
        </a>
      </Container>
    );
  }

  return (
    <Container isSelected={isSelected} onClick={menuHasClosed}>
      <Link
        type={type}
        id={id}
        page={['latest', 'author', 'tag', 'category'].includes(type) ? 1 : null}
        context={context}
        eventCategory="Menu"
        eventAction={
          ['page', 'post'].includes(type) ? 'open single' : 'open list'
        }
      >
        <a>{label}</a>
      </Link>
    </Container>
  );
};

MenuItem.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  target: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  context: PropTypes.shape({}),
  menuHasClosed: PropTypes.func.isRequired,
};

MenuItem.defaultProps = {
  url: null,
  target: '_blank',
  context: null,
};

export default inject(({ stores: { connection, theme } }, { type, id }) => ({
  menuHasClosed: theme.menu.hasClosed,
  isSelected: computed(
    () =>
      connection.selectedItem.type === type &&
      connection.selectedItem.id === id,
  ).get(),
}))(MenuItem);

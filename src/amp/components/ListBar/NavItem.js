/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container } from '../../../shared/styled/ListBar/NavItem';

const NavItem = ({ label, active, url }) => (
  <Container isActive={active}>
    <a href={url}>{active ? <h1>{label}</h1> : label}</a>
  </Container>
);

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  active: PropTypes.bool.isRequired,
};

NavItem.defaultProps = {
  url: null,
};

export default inject(({ connection }, { id, type, url }) => {
  if (url) return {};

  return {
    url: connection.single[type][id]._link,
  };
})(NavItem);

/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container } from '../../../shared/styled/Menu/MenuItem';

const MenuItem = ({ label, url, active }) => (
  <Container isActive={active}>
    <a href={url}>{label}</a>
  </Container>
);

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  active: PropTypes.bool.isRequired
};

MenuItem.defaultProps = {
  url: null
};

export default inject(({ connection }, { id, type, url }) => {
  if (url) return {};

  return {
    url: connection.single[type][id]._link
  };
})(MenuItem);

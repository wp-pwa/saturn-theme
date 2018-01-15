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

  console.log('type:', type, url, id)
  console.log('single:', connection.single[type])
  return ({
    url: connection.single[type][id]._link
  })
}
)(MenuItem);

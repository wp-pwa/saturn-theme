import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '../../../shared/styled/Menu/MenuItem';

const MenuItem = ({ label, url, active }) => (
  <Container isActive={active}>
    <a href={url}>{label}</a>
  </Container>
);

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

export default MenuItem;

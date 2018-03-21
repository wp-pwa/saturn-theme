/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container } from '../../../shared/styled/ListBar/NavItem';

const NavItem = ({ label, active, url, linkType }) => (
  <Container isActive={active}>
    <a className={linkType} href={url}>{active ? <h1>{label}</h1> : label}</a>
  </Container>
);

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  active: PropTypes.bool.isRequired,
  linkType: PropTypes.string,
};

NavItem.defaultProps = {
  url: null,
  linkType: null,
};

export default inject(({ connection }, { id, type, url }) => {
  // latest has a url but needs linkType prop
  if (type === 'latest') return { linkType: 'navbar-list' };

  if (url) return {};

  return {
    url: connection.single[type][id]._link,
    linkType: ['post', 'page', 'media'].includes(type) ? 'navbar-single' : 'navbar-list',
  };
})(NavItem);

/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container } from '../../../shared/styled/ListBar/NavItem';
import { navbarOpenSingle, navbarOpenList } from '../../analytics/classes';

const NavItem = ({ label, active, url, analyticsClass }) => (
  <Container isActive={active}>
    <a className={analyticsClass} href={url}>{active ? <h1>{label}</h1> : label}</a>
  </Container>
);

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  active: PropTypes.bool.isRequired,
  analyticsClass: PropTypes.string,
};

NavItem.defaultProps = {
  url: null,
  analyticsClass: null,
};

export default inject(({ connection }, { id, type, url }) => {
  // latest has a url but needs analyticsClass prop
  if (type === 'latest') return { analyticsClass: navbarOpenList };

  if (url) return {};

  return {
    url: connection.single[type][id]._link,
    analyticsClass: ['post', 'page', 'media'].includes(type) ? navbarOpenSingle : navbarOpenList,
  };
})(NavItem);

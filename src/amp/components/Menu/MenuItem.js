/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container } from '../../../shared/styled/Menu/MenuItem';
import { menuOpenSingle, menuOpenList } from '../../analytics/classes';

const MenuItem = ({ label, url, active, analyticsClass }) => (
  <Container isActive={active}>
    <a className={analyticsClass} href={url}>
      {label}
    </a>
  </Container>
);

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  active: PropTypes.bool.isRequired,
  analyticsClass: PropTypes.string,
};

MenuItem.defaultProps = {
  url: null,
  analyticsClass: null,
};

export default inject(({ stores: { connection } }, { id, type, url }) => {
  // latest has a url but needs analyticsClass prop
  if (type === 'latest') return { analyticsClass: menuOpenList };

  if (url) return {};

  return {
    url: connection.entity(type, id).link,
    analyticsClass: ['post', 'page', 'media'].includes(type)
      ? menuOpenSingle
      : menuOpenList,
  };
})(MenuItem);

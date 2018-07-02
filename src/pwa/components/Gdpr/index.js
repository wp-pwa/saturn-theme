/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const openGpdrModal = () => window.__cmp('displayConsentUi');

const Gdpr = ({ isEnabled }) =>
  isEnabled ? (
    <Button onClick={openGpdrModal}>Opciones de privacidad</Button>
  ) : null;

Gdpr.propTypes = {
  isEnabled: PropTypes.bool,
};

Gdpr.defaultProps = {
  isEnabled: false,
};

export default inject(({ stores: { settings } }) => {
  const gdpr = settings.theme.gdpr || {};

  return {
    isEnabled: gdpr.pwa,
  };
})(Gdpr);

const Button = styled.li`
  bottom: 0;
  width: 100%;
  height: ${({ theme }) => theme.heights.bar};
  border-top: 1px solid #ddd;
  background: white;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  padding-left: 23px;
  text-align: left;
  font-size: 0.9rem;
`;

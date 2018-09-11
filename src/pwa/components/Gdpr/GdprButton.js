/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const openGpdrModal = () => window.__cmp('displayConsentUi');

const GdprButton = ({ isEnabled, gdprText }) =>
  isEnabled ? <Button onClick={openGpdrModal}>{gdprText}</Button> : null;

GdprButton.propTypes = {
  isEnabled: PropTypes.bool,
  gdprText: PropTypes.string.isRequired,
};

GdprButton.defaultProps = {
  isEnabled: false,
};

export default inject(({ stores: { theme, settings } }) => {
  const gdpr = settings.theme.gdpr || {};

  return {
    isEnabled: gdpr.pwa,
    gdprText: theme.lang.get('gdpr'),
  };
})(GdprButton);

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

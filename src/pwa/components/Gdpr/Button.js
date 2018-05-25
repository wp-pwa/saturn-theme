/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';

const openGpdrModal = () => window.__cmp('showConsentUI', true);

const GpdrButton = ({ isEnabled }) =>
  isEnabled && <Button onClick={openGpdrModal}>Opciones de privacidad</Button>;

GpdrButton.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const gpdr =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'gdpr')(state) || {};

  return {
    isEnabled: gpdr.pwa,
  };
};

export default connect(mapStateToProps)(GpdrButton);

const Button = styled.div`
  position: absolute;
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

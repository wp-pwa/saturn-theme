/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'react-emotion';

const openGpdrModal = () => window.__cmp('showConsentUI', true);

export default () => <Button onClick={openGpdrModal}>Opciones de cookies</Button>;

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

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import * as deps from '../../deps';
import Form from './Form';
import FetchInfo from './FetchInfo';

export default () => {
  const RootContainer = deps.elements.RootContainer;
  return (
    <RootContainer mobilePreview>
      <h1 className="title">Saturn Theme</h1>
      <h2 className="subtitle">Configure your theme options here</h2>
      <hr />
      <Form />
      <hr />
      <FetchInfo />
    </RootContainer>
  );
};

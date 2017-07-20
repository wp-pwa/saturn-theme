/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import * as deps from '../../deps';
import Form from './Form';

export default () => {
  const RootContainer = deps.elements.RootContainer;
  return (
    <RootContainer mobilePreview>
      <h1 className="title">Saturn Theme settings</h1>
      <hr />
      <Form />
    </RootContainer>
  );
};

import React from 'react';
import * as deps from '../../deps';

const Content = () => (
  <div>
    <h1>I am a Worona package</h1>
    <div>And this is my content.</div>
  </div>
);

export default () => {
  const RootContainer = deps.elements.RootContainer;
  return (
    <RootContainer mobilePreview>
      <Content />
    </RootContainer>
  );
};

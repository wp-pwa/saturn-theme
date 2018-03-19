import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import LazyLoad from 'react-lazy-load';

const LazyIframe = ({ width, height, attributes }) => (
  <Container styles={{ width, height }}>
    <LazyLoad elementType="span" offsetVertical={400} offsetHorizontal={-10} throttle={50}>
      <iframe title={attributes.title || ''} {...attributes} />
    </LazyLoad>
  </Container>
);

LazyIframe.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  attributes: PropTypes.shape({}).isRequired,
};

export default LazyIframe;

const Container = styled.span`
  display: block;
  position: relative;
  left: -15px;
  height: ${({ styles }) => styles.height};
  width: ${({ styles }) => styles.width};

  & > .LazyLoad {
    display: block;
    width: 100%;
    height: 100%;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
`;

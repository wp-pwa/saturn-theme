/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import IconImage from '../Icons/Image';

const Image = ({
  alt,
  width,
  height,
  isContent,
  src,
  srcSet,
  sizes,
  isAmp,
}) => {
  if (isAmp) {
    return (
      <Container isContent={isContent} styles={{ height, width }}>
        {src || srcSet ? (
          <amp-img
            alt={alt}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            layout="fill"
          />
        ) : null}
      </Container>
    );
  }

  return (
    <Container isContent={isContent} styles={{ height, width }}>
      <Icon isContent={isContent} styles={{ height, width }}>
        <IconImage size={40} />
      </Icon>
      {src || srcSet ? (
        <img alt={alt} src={src} srcSet={srcSet} sizes={sizes} />
      ) : null}
    </Container>
  );
};

Image.propTypes = {
  isContent: PropTypes.bool,
  width: PropTypes.string, // CSS values
  height: PropTypes.string, // CSS values
  alt: PropTypes.string,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  isAmp: PropTypes.bool,
};

Image.defaultProps = {
  isContent: false,
  width: 'auto',
  height: 'auto',
  alt: null,
  src: null,
  srcSet: null,
  sizes: null,
  isAmp: false,
};

export default inject(
  ({ stores: { connection, build } }, { id, isContent, width, height }) => {
    if (!id) return { isAmp: build.isAmp };

    const media = connection.entity('media', id);

    return {
      id,
      isAmp: build.isAmp,
      isContent: !!isContent,
      alt: media.alt,
      src: media.src,
      srcSet: media.srcSet,
      sizes: media.srcSet && `${parseInt(width, 10) || 100}vw`,
      width: width || '100vw',
      height:
        height || `${100 * (media.original.height / media.original.width)}vw`,
    };
  },
)(Image);

const Container = styled.span`
  display: ${({ isContent }) => (isContent ? 'block' : 'flex')};
  ${({ isContent }) => (isContent ? '' : 'align-items: stretch')};
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  position: relative;
  margin: ${({ isContent }) => (isContent ? '15px 0' : '')};
  ${({ isContent }) => isContent && 'left: -15px'};

  img {
    ${({ isContent, styles }) =>
      isContent && styles.height === 'auto'
        ? 'position: static'
        : 'position: absolute'};
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    color: transparent;
    border: none;
  }
`;

const Icon = styled.span`
  position: absolute;
  top: 0;
  color: #bdbdbd;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isContent, styles }) =>
    isContent && styles.height === 'auto' ? 'z-index: -1' : ''};
`;

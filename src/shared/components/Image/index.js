/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import IconImage from '../Icons/Image';

class Image extends Component {
  static propTypes = {
    isContent: PropTypes.bool,
    width: PropTypes.string, // CSS values
    height: PropTypes.string, // CSS values
    alt: PropTypes.string,
    src: PropTypes.string,
    srcSet: PropTypes.string,
    sizes: PropTypes.string,
    isAmp: PropTypes.bool.isRequired,
    isSsr: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isContent: false,
    width: 'auto',
    height: 'auto',
    alt: null,
    src: null,
    srcSet: null,
    sizes: null,
  };

  constructor(props) {
    super(props);

    if (typeof window !== 'undefined' && props.isSsr) {
      this.currentImage = window.document.querySelector(
        `img.lazy.loaded[src='${props.src}']`,
      );
    }
  }

  componentDidMount() {
    window.document.lazyLoadInstance.update();
  }

  render() {
    const {
      alt,
      width,
      height,
      isContent,
      src,
      srcSet,
      sizes,
      isAmp,
    } = this.props;

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
          <img
            alt={alt}
            {...(this.currentImage
              ? {
                  className: this.currentImage.className,
                  src: this.currentImage.src,
                  srcSet: this.currentImage.srcset,
                  sizes: this.currentImage.sizes,
                  'data-src': this.currentImage.dataset.src,
                  'data-srcset': this.currentImage.dataset.srcset,
                  'data-sizes': this.currentImage.dataset.sizes,
                  'data-was-processed': this.currentImage.dataset.wasProcessed,
                }
              : {
                  className: 'lazy',
                  'data-src': src,
                  'data-srcset': srcSet,
                  'data-sizes': sizes,
                })}
          />
        ) : null}
      </Container>
    );
  }
}

export default inject(
  ({ stores: { connection, build } }, { id, isContent, width, height }) => {
    if (!id) return { isAmp: build.isAmp, isSsr: build.isSsr };

    const media = connection.entity('media', id);

    return {
      id,
      isAmp: build.isAmp,
      isSsr: build.isSsr,
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
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitionTime} ease-in;
  }

  img.loaded {
    opacity: 1;
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

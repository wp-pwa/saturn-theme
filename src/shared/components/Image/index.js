/* eslint-disable jsx-a11y/anchor-is-valid, react/no-danger */
import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import IconImage from '../Icons/Image';

class Image extends Component {
  static propTypes = {
    isContent: bool,
    width: string, // CSS values
    height: string, // CSS values
    alt: string,
    src: string,
    srcSet: string,
    sizes: string,
    isAmp: bool.isRequired,
    hasPlaceholder: bool,
    objectFit: string,
  };

  static defaultProps = {
    isContent: false,
    width: 'auto',
    height: 'auto',
    alt: null,
    src: null,
    srcSet: null,
    sizes: null,
    hasPlaceholder: true,
    objectFit: 'cover',
  };

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
      hasPlaceholder,
      objectFit,
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
      <Container
        isContent={isContent}
        objectFit={objectFit}
        styles={{ height, width }}
      >
        {hasPlaceholder && (
          <Icon isContent={isContent} styles={{ height, width }}>
            <IconImage size={40} />
          </Icon>
        )}
        <span
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              src || srcSet
                ? `<img
                    alt="alt"
                    class="lazy"
                    ${src && `data-src="${src}"`}
                    ${srcSet && `data-srcset="${srcSet}"`}
                    ${sizes && `data-sizes="${sizes}"`}
                  >`
                : null,
          }}
        />
      </Container>
    );
  }
}

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
        height ||
        `${100 * (media.original.height / media.original.width || 0.6)}vw`,
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

  span > img {
    ${({ isContent, styles }) =>
      isContent && styles.height === 'auto'
        ? 'position: static'
        : 'position: absolute'};
    width: 100%;
    height: 100%;
    object-fit: ${({ objectFit }) => objectFit};
    object-position: center;
    color: transparent;
    border: none;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitionTime} ease-in;
  }

  amp-img > img {
    object-fit: cover;
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

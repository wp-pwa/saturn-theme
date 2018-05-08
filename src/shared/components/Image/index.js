import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { parse } from 'url';
import IconImage from 'react-icons/lib/fa/image';
import styled from 'react-emotion';
import { dep } from 'worona-deps';

const Image = ({ alt, width, height, content, src, srcSet, isAmp }) => {
  if (isAmp) {
    return (
      // content.toString() -> Avoids a warning from emotion.
      <Container content={content.toString()} styles={{ height, width }}>
        {src || srcSet ? <amp-img alt={alt} src={src} srcSet={srcSet} layout="fill" /> : null}
      </Container>
    );
  }

  return (
    // content.toString() -> Avoids a warning from emotion.
    <Container content={content.toString()} styles={{ height, width }}>
      <Icon>
        <IconImage size={40} />
      </Icon>
      <img alt={alt} sizes={`${parseInt(width, 10)}vw`} src={src} srcSet={srcSet} />
    </Container>
  );
};

Image.propTypes = {
  content: PropTypes.bool, // Indicates that Image will be rendered inside Content
  width: PropTypes.string, // CSS values
  height: PropTypes.string, // CSS values
  alt: PropTypes.string, // Alt from HtmlToReactConverter or getAlt selector.
  src: PropTypes.string, // Src from HtmlToReactConverter or getSrc selector.
  srcSet: PropTypes.string, // SrcSet from HtmlToReactConverter or getSrcSet selector.
  isAmp: PropTypes.bool, // Indicates if the component will be used in the AMP version.
};

Image.defaultProps = {
  width: 'auto',
  height: 'auto',
  content: false,
  alt: '',
  src: '',
  srcSet: '',
  isAmp: false,
};

const mapStateToProps = state => ({
  isAmp: state.build.amp,
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection, settings }, { id, content, width, height }) => {
    if (!id) return {};

    const media = connection.entity('media', id);
    const originalPath = parse(media.original.url).path;
    const cdn = (settings.theme.cdn || {}).images;

    // Returns true if width/height ratio of both objects are very, very close.
    // Used when computing the srcSet prop value.
    const sameRatio = ({ width: w1, height: h1 }, { width: w2, height: h2 }) =>
      Math.abs(w1 / h1 - w2 / h2) < 0.01;
    return {
      content: !!content,
      alt: media.alt,
      src: cdn && originalPath ? `${cdn}${originalPath}` : media.original.url,
      srcSet: media.sizes
        .reduce((result, current) => {
          if (
            sameRatio(current, media.original) &&
            !result.find(size => size.width === current.width)
          ) {
            result.push(current);
          }
          return result;
        }, [])
        .map(item => {
          const { path } = parse(item.url);
          const url = cdn && path ? `${cdn}${path}` : item.url;

          return `${url} ${item.width}w`;
        })
        .join(', '),
      width: width || '100vw',
      height: height || `${media.original.height * 100 / media.original.width}vw`,
    };
  }),
)(Image);

const Container = styled.span`
  display: ${({ content }) => (content === 'true' ? 'block' : 'flex')};
  ${({ content }) => (content === 'true' ? '' : 'align-items: stretch')};
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  position: relative;
  margin: ${({ content }) => (content === 'true' ? '15px 0' : '')};
  ${({ content }) => content === 'true' && 'left: -15px'};

  img {
    ${({ content, styles }) =>
      content && styles.height === 'auto' ? 'position: static' : 'position: absolute'};
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
  z-index: -1;
`;

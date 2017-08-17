import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import IconImage from 'react-icons/lib/fa/image';
import styled from 'styled-components';
import { dep } from 'worona-deps';

class Media extends React.Component {

  shouldComponentUpdate(nextProps) {
    // Ignores re-render when server side rendering was active but not anymore.
    if (this.props.ssr && !nextProps.ssr) return false;
    return true;
  }

  render() {
    const { isMediaReady, media, width, height, lazy, ssr, lazyHorizontal, imgProps } = this.props;
    let alt;
    let src;
    let srcSet;

    if (isMediaReady) {
      const images = media.media_details.sizes;

      alt = media.alt_text;
      src = media.source_url;
      srcSet = Object.keys(images)
        .reduce((a, b) => {
          if (a.every(item => images[item].width !== images[b].width)) a.push(b);
          return a;
        }, [])
        .map(key => `${images[key].source_url} ${images[key].width}`)
        .reduce((total, current) => `${total}${current}w, `, '');
    } else if (imgProps) {
      alt = imgProps.alt;
      src = imgProps.src;
      srcSet = imgProps.srcSet;
    }

    const offsets = { offsetVertical: 500 };
    if (lazyHorizontal) offsets.offsetHorizontal = 500;

    return (
      <Container height={height} width={width}>
        <Icon>
          <IconImage size={40} />
        </Icon>
        {lazy && !ssr
          ? <StyledLazyLoad {...offsets} throttle={50}>
            <Img alt={alt} src={src} srcSet={srcSet} />
          </StyledLazyLoad>
          : <Img alt={alt} src={src} srcSet={srcSet} />}
      </Container>
    );
  }
}

Media.propTypes = {
  lazy: PropTypes.bool, // Specifies if image is lazy loaded
  lazyHorizontal: PropTypes.bool, // Applies horizontal offset when lazy loading
  width: PropTypes.string, // CSS values
  height: PropTypes.string, // CSS values
  media: PropTypes.shape({}), // Media object from WP
  isMediaReady: PropTypes.bool.isRequired,
  ssr: PropTypes.bool.isRequired, // Is server side rendering active
  imgProps: PropTypes.shape({}), // Image props coming from HtmlToReactConverter
};

const mapStateToProps = (state, ownProps) => ({
  media: dep('connection', 'selectors', 'getMediaEntities')(state)[ownProps.id],
  isMediaReady: dep('connection', 'selectorCreators', 'isMediaReady')(ownProps.id)(state) || false,
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

export default connect(mapStateToProps)(Media);

const Container = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  position: relative;
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  color: #bdbdbd;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-color: transparent;
  color: transparent;
  border: none !important;
`;

const StyledLazyLoad = Img.withComponent(LazyLoad);

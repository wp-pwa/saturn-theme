import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { parse } from 'url';
import Lazy from 'react-lazy-load';
import IconImage from 'react-icons/lib/fa/image';
import Transition from 'react-transition-group/Transition';
import styled from 'react-emotion';
import { dep } from 'worona-deps';

class Image extends React.Component {
  static propTypes = {
    ssr: PropTypes.bool.isRequired, // Is server side rendering active
    lazy: PropTypes.bool, // Specifies if image is lazy loaded
    content: PropTypes.bool, // Indicates that Image will be rendered inside Content
    width: PropTypes.string, // CSS values
    height: PropTypes.string, // CSS values
    alt: PropTypes.string, // Alt from HtmlToReactConverter or getAlt selector.
    src: PropTypes.string, // Src from HtmlToReactConverter or getSrc selector.
    srcSet: PropTypes.string, // SrcSet from HtmlToReactConverter or getSrcSet selector.
    offsetVertical: PropTypes.number,
    offsetHorizontal: PropTypes.number,
    isAmp: PropTypes.bool,
  };

  static defaultProps = {
    width: 'auto',
    height: 'auto',
    lazy: false,
    content: false,
    alt: '',
    src: '',
    srcSet: '',
    offsetVertical: 200,
    offsetHorizontal: 0,
    isAmp: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      ssr: props.ssr,
      visible: false,
    };

    this.handleContentVisible = this.handleContentVisible.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // Ignores re-render when server side rendering was active but not anymore.
    if (this.props.ssr && !nextProps.ssr) return false;
    return true;
  }

  handleContentVisible() {
    this.setState({ visible: true });
  }

  render() {
    const {
      alt,
      width,
      height,
      lazy,
      content,
      src,
      srcSet,
      offsetHorizontal,
      offsetVertical,
      isAmp,
    } = this.props;

    const { ssr } = this.state;

    if (isAmp) {
      return (
        // content.toString() -> Avoids a warning from emotion.
        <Container content={content.toString()} styles={{ height, width }}>
          <amp-img alt={alt} src={src} srcSet={srcSet} layout="fill" />
        </Container>
      );
    }

    return (
      // content.toString() -> Avoids a warning from emotion.
      <Container content={content.toString()} styles={{ height, width }}>
        <Icon>
          <IconImage size={40} />
        </Icon>
        {src &&
          (lazy && !ssr ? (
            <StyledLazy
              offsetVertical={offsetVertical}
              offsetHorizontal={offsetHorizontal}
              onContentVisible={this.handleContentVisible}
              debounce={false}
              throttle={300}
              styles={{ height, width }}
              content={content.toString()}
            >
              <Transition
                in={this.state.visible}
                timeout={300}
                appear
                onEnter={() => window.scrollX}
              >
                {status => (
                  <Img
                    status={status}
                    alt={alt}
                    sizes={`${parseInt(width, 10)}vw`}
                    src={src}
                    srcSet={srcSet}
                  />
                )}
              </Transition>
            </StyledLazy>
          ) : (
            <Img
              status="entered"
              alt={alt}
              sizes={`${parseInt(width, 10)}vw`}
              src={src}
              srcSet={srcSet}
            />
          ))}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const cdn = dep('settings', 'selectorCreators', 'getSetting')('theme', 'cdn')(state);
  return {
    ssr: dep('build', 'selectors', 'getSsr')(state),
    isAmp: state.build.amp,
    cdn: cdn && cdn.images,
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id, lazy, content, cdn }) => {
    if (!id) return {};

    const media = connection.single.media[id];

    const originalPath = media.original && media.original.url && parse(media.original.url).path;
    const src =
      cdn && originalPath ? `${cdn}${originalPath}` : media.original && media.original.url;

    return {
      lazy: !!lazy,
      content: !!content,
      alt: media.alt,
      src,
      srcSet:
        media.sizes &&
        media.sizes
          .reduce((result, current) => {
            if (!result.find(item => item.width === current.width)) result.push(current);
            return result;
          }, [])
          .map(item => {
            const { path } = parse(item.url);
            const url = cdn && path ? `${cdn}${path}` : item.url;
            return `${url} ${item.width}w`;
          })
          .join(', '),
    };
  }),
)(Image);

const Container = styled.div`
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  position: relative;
  margin: ${({ content }) => (content === 'true' ? '15px 0' : '')};

  img {
    width: 100%;
    height: ${({ styles, content }) =>
      styles.height === 'auto' && content === 'true' ? 'auto' : '100%'};
    position: ${({ styles }) => (styles.height === 'auto' ? 'static' : 'absolute')};
    display: block;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
    background-color: transparent;
    color: transparent;
    border: none;
  }
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
  filter: ${({ status }) => (status.startsWith('enter') ? 'opacity(100%)' : 'opacity(0)')};
  transition: filter 300ms ease-in;
`;

const StyledLazy = styled(Lazy)`
  position: ${({ styles }) => (styles.height === 'auto' ? 'relative' : 'absolute')};
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ styles, content }) =>
    styles.height === 'auto' && content === 'true' ? 'auto' : '100%'};
  object-fit: cover;
  object-position: center;
  background-color: transparent;
  color: transparent;
  border: none;
`;

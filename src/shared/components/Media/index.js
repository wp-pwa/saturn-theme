import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Lazy from 'react-lazy-load';
import IconImage from 'react-icons/lib/fa/image';
import Transition from 'react-transition-group/Transition';
import styled from 'react-emotion';
import { dep } from 'worona-deps';

class Media extends React.Component {
  static propTypes = {
    ssr: PropTypes.bool.isRequired, // Is server side rendering active
    lazy: PropTypes.bool, // Specifies if image is lazy loaded
    content: PropTypes.bool, // Indicates that Media will be rendered inside Content
    width: PropTypes.string, // CSS values
    height: PropTypes.string, // CSS values
    alt: PropTypes.string, // Alt from HtmlToReactConverter or getAlt selector.
    src: PropTypes.string, // Src from HtmlToReactConverter or getSrc selector.
    srcSet: PropTypes.string, // SrcSet from HtmlToReactConverter or getSrcSet selector.
    offsetVertical: PropTypes.number,
    offsetHorizontal: PropTypes.number,
    isAmp: PropTypes.bool,
    objectFit: PropTypes.oneOf(['fill', 'contain', 'cover', 'scale-down', 'none']),
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
    objectFit: 'cover'
  };

  constructor(props) {
    super(props);

    this.state = {
      ssr: props.ssr,
      visible: false
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
      objectFit,
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
      <Container content={content.toString()} styles={{ height, width, objectFit }}>
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

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
  isAmp: state.build.amp
});

export default compose(
  connect(mapStateToProps),
  inject((stores, { id, lazy, content }) => {
    if (content) return {};

    const media = stores.connection.single.media[id];

    return {
      lazy: !!lazy,
      content: !!content,
      alt: media.alt,
      src: media.original && media.original.url,
      srcSet:
        media.sizes &&
        media.sizes
          .reduce((result, current) => {
            if (!result.find(item => item.width === current.width)) result.push(current);
            return result;
          }, [])
          .map(item => `${item.url} ${item.width}w`)
          .join(', ')
    };
  })
)(Media);

const Container = styled.div`
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  position: relative;
  margin: ${({ content }) => (content === 'true' ? '15px 0' : '')};

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: ${({ styles }) => styles.objectFit};
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-color: transparent;
  color: transparent;
  border: none;
`;

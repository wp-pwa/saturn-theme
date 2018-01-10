import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import IconInstagram from 'react-icons/lib/fa/instagram';
import styled from 'react-emotion';
import { dep } from 'worona-deps';

class LazyInstagram extends Component {
  static propTypes = {
    children: PropTypes.shape({}).isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired
  };

  constructor() {
    super();

    this.ref = null;
    this.state = {
      loaded: false
    };

    this.handleContentVisible = this.handleContentVisible.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.loaded !== nextState.loaded || this.props.ssr !== nextProps.ssr;
  }

  componentWillUpdate() {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else if (!window.document.getElementById('lazy-instagram')) {
      const script = window.document.createElement('script');
      script.id = 'lazy-instagram';
      script.src = '//platform.instagram.com/en_US/embeds.js';
      script.async = true;
      script.defer = true;
      script.chartset = 'utf-8';
      script.onload = () => window.instgrm.Embeds.process();

      window.document.body.appendChild(script);
    }
  }

  handleContentVisible() {
    this.setState({
      loaded: true
    });
  }

  render() {
    const { children, width, height, ssr } = this.props;
    const { loaded } = this.state;

    return (
      <Container
        styles={{ height, width }}
        innerRef={node => {
          this.ref = node;
        }}
      >
        {!loaded && (
          <Icon>
            <IconInstagram size={40} />
          </Icon>
        )}
        {!ssr && (
          <StyledLazyLoad
            offsetVertical={700}
            throttle={50}
            onContentVisible={this.handleContentVisible}
          >
            {children}
          </StyledLazyLoad>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state)
});

export default connect(mapStateToProps)(LazyInstagram);

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  min-height: 170px;
  padding: 0 15px;
  margin: 15px 0;

  blockquote {
    margin: 0;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 65px;
  left: 0;
  color: #bdbdbd;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLazyLoad = styled(LazyLoad)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-color: transparent;
  border: none !important;
  z-index: 10 !important;
`;

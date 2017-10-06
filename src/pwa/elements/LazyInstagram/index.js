import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import IconInstagram from 'react-icons/lib/fa/instagram';
import styled from 'styled-components';

class LazyInstagram extends Component {
  constructor() {
    super();

    this.ref = null;
    this.state = {
      loaded: false,
    };

    this.handleContentVisible = this.handleContentVisible.bind(this);
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state.loaded !== nextState.loaded;
  }

  componentWillUpdate() {
    if (window.document.getElementById('lazy-instagram') && window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = window.document.createElement('script');
      script.id = 'lazy-instagram';
      script.src = '//platform.instagram.com/en_US/embeds.js';
      script.async = true;
      script.defer = true;
      script.chartset = 'utf-8';

      window.document.body.appendChild(script);
    }
  }

  handleContentVisible() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    const { children, width, height } = this.props;

    return (
      <Container
        height={height}
        width={width}
        innerRef={node => {
          this.ref = node;
        }}
      >
        {!this.state.loaded && (
          <Icon>
            <IconInstagram size={40} />
          </Icon>
        )}
        <StyledLazyLoad
          offsetVertical={700}
          throttle={50}
          onContentVisible={this.handleContentVisible}
        >
          {children}
        </StyledLazyLoad>
      </Container>
    );
  }
}

LazyInstagram.propTypes = {
  children: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default LazyInstagram;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: ${props => props.width};
  height: ${props => props.height};
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

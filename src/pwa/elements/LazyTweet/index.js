import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import IconTwitter from 'react-icons/lib/fa/twitter';
import styled from 'styled-components';

class LazyTweet extends Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
    };

    this.handleContentVisible = this.handleContentVisible.bind(this);
  }

  componentWillUpdate(_nextProps, nextState) {
    if (this.state.loaded !== nextState.loaded) {
      const script = window.document.createElement('script');

      script.src = '//platform.twitter.com/widgets.js';
      script.async = true;
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
      <Container height={height} width={width}>
        {!this.state.loaded && (
          <Icon>
            <IconTwitter size={40} />
          </Icon>
        )}
        <StyledLazyLoad
          offsetVertical={500}
          throttle={50}
          onContentVisible={this.handleContentVisible}
        >
          {children}
        </StyledLazyLoad>
      </Container>
    );
  }
}

LazyTweet.propTypes = {
  children: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default LazyTweet;

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

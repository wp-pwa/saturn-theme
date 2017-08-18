import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import IconVideo from 'react-icons/lib/md/ondemand-video';
import styled from 'styled-components';
import { dep } from 'worona-deps';

class LazyVideo extends Component {
  shouldComponentUpdate(nextProps) {
    // Ignores re-render when server side rendering was active but not anymore.
    if (this.props.ssr && !nextProps.ssr) return false;
    return true;
  }
  render() {
    const { children, width, height, ssr } = this.props;

    return (
      <Container height={height} width={width}>
        <Icon>
          <IconVideo size={40} />
        </Icon>{' '}
        {!ssr &&
          <StyledLazyLoad offsetVertical={500} throttle={50}>
            {children}
          </StyledLazyLoad>}
      </Container>
    );
  }
}
// const LazyVideo = ({ children, width, height, ssr }) =>

LazyVideo.propTypes = {
  children: PropTypes.shape({}),
  width: PropTypes.string,
  height: PropTypes.string,
  ssr: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

export default connect(mapStateToProps)(LazyVideo);

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

const StyledLazyLoad = styled(LazyLoad)`
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

import React, { PropTypes } from 'react';
import LazyLoad from 'react-lazy-load';
import IconVideo from 'react-icons/lib/md/ondemand-video';
import styled from 'styled-components';

const LazyVideo = ({ children, width, height }) =>
  <Container height={height} width={width}>
    <Icon>
      <IconVideo size={40} />
    </Icon>{' '}
    <StyledLazyLoad offsetVertical={500} throttle={50}>
      {children}
    </StyledLazyLoad>
  </Container>;

LazyVideo.propTypes = {
  children: PropTypes.shape({}),
  width: PropTypes.string,
  height: PropTypes.string,
};

export default LazyVideo;

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

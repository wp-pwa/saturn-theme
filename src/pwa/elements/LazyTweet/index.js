import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import IconTwitter from 'react-icons/lib/fa/twitter';
import styled from 'styled-components';
import { dep } from 'worona-deps';

const LazyVideo = ({ children, width, height, ssr }) => (
  <Container height={height} width={width}>
    <Icon>
      <IconTwitter size={40} />
    </Icon>{' '}
    {!ssr && (
      <StyledLazyLoad offsetVertical={500} throttle={50}>
        {children}
      </StyledLazyLoad>
    )}
  </Container>
);

LazyVideo.propTypes = {
  children: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
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

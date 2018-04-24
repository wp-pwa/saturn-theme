import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Spinner from '../../elements/Spinner';
import * as selectors from '../../selectors';
import * as selectorCreators from '../../selectorCreators';

const Media = ({ id, ready, src, alt, format, Ad }) =>
  ready ? (
    <Container>
      <Image src={src} alt={alt} />
      {format && <Ad isMedia item={{ id, type: 'media' }} {...format} />}
    </Container>
  ) : (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );

Media.propTypes = {
  Ad: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  ready: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  format: PropTypes.shape({}),
};

Media.defaultProps = {
  format: null,
};

const mapStateToProps = (state, { id }) => {
  const adsFormats = selectorCreators.ads.getContentFormats('media')(state);

  return {
    Ad: dep('ads', 'components', 'Ad'),
    shareReady: selectorCreators.share.areCountsReady(id)(state),
    lists: selectors.list.getLists(state),
    format: adsFormats && adsFormats[0],
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id }) => ({
    ready: connection.entity('media', id).ready,
    src: connection.entity('media', id).original.url,
    alt: connection.entity('media', id).alt,
  })),
)(Media);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
  background: #0e0e0e;
  width: 100vw;
  min-height: ${({ theme }) => `calc(100vh - ${theme.heights.bar})`};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.heights.bar};
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  object-fit: contain;
  max-width: 100%;
  max-height: 80%;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

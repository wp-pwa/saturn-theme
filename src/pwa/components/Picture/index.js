import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Spinner from '../../elements/Spinner';
import * as selectors from '../../selectors';
import * as selectorCreators from '../../selectorCreators';
import Ad from '../../../shared/components/Ad';

const Picture = ({ item, ready, src, alt, format }) =>
  ready ? (
    <Container>
      <InnerContainer>
        <Image src={src} alt={alt} />
        {/* <InfoContainer>
          <Title>{title}</Title>
          <Author>{author}</Author>
        </InfoContainer> */}
      </InnerContainer>
      <Ad item={item} {...format} />
    </Container>
  ) : (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );

Picture.propTypes = {
  item: PropTypes.shape({}),
  ready: PropTypes.bool.isRequired,
  src: PropTypes.string,
  alt: PropTypes.string,
  format: PropTypes.shape({}),
};

Picture.defaultProps = {
  item: null,
  src: '',
  alt: '',
  format: null,
};

const mapStateToProps = (state, { id }) => {
  const adsFormats = selectorCreators.ads.getFormats('media')(state);

  return {
    shareReady: selectorCreators.share.areCountsReady(id)(state),
    lists: selectors.list.getLists(state),
    format: adsFormats ? adsFormats[0] : {},
  };
};

export default connect(mapStateToProps)(
  inject(({ connection }, { id }) => {
    const media = connection.single.media[id];
    const ready = media && media.ready;

    if (ready) {
      return {
        ready,
        item: media,
        title: media.meta.title,
        author: media.author.name,
        src: media.original.url,
        alt: media.alt,
      };
    }
    return { ready };
  })(Picture),
);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
  background: #0e0e0e;
  width: 100vw;
  min-height: ${({ theme }) => `calc(100vh - (${theme.heights.bar} * 2))`};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  object-fit: contain;
  max-width: 100%;
  max-height: 80%;
`;

// const InfoContainer = styled.div`
//   box-sizing: border-box;
//   padding: 0 15px;
//   color: white;
// `;

// const Title = styled.h2`
//   font-size: 16px;
// `;
//
// const Author = styled.h3`
//   font-size: 12px;
// `;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Spinner from '../../elements/Spinner';
import * as selectors from '../../selectors';
import * as selectorCreators from '../../selectorCreators';

const Picture = ({ ready, title, author, src, alt }) =>
  ready ? (
    <Container>
      <Placeholder />
      <InnerContainer>
        <Image src={src} alt={alt} />
        <InfoContainer>
          <Title>{title}</Title>
          <Author>{author}</Author>
        </InfoContainer>
      </InnerContainer>
    </Container>
  ) : (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );

Picture.propTypes = {
  ready: PropTypes.bool.isRequired,
  title: PropTypes.string,
  author: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Picture.defaultProps = {
  title: '',
  author: '',
  src: '',
  alt: '',
};

const mapStateToProps = (state, { id }) => ({
  shareReady: selectorCreators.share.areCountsReady(id)(state),
  lists: selectors.list.getLists(state),
});

export default connect(mapStateToProps)(
  inject(({ connection }, { id }) => {
    const media = connection.single.media[id];
    const ready = media && media.ready;

    if (ready) {
      return {
        ready,
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
  height: 100vh;
`;

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.heights.bar};
  background-color: #0e0e0e;
`;

const InnerContainer = styled.div`
  height: calc(100vh - (${({ theme }) => theme.heights.bar} * 2));
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

const InfoContainer = styled.div`
  box-sizing: border-box;
  padding: 0 15px;
  color: white;
`;

const Title = styled.h2`
  font-size: 16px;
`;

const Author = styled.h3`
  font-size: 12px;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

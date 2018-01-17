import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Spinner from '../../elements/Spinner';
import * as selectors from '../../selectors';
import * as selectorCreators from '../../selectorCreators';

const Picture = ({ ready, title, src, alt }) =>
  ready ? (
    <Container>
      <Placeholder />
      <InnerContainer>
        <Image src={src} alt={alt} />
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
  src: PropTypes.string,
  alt: PropTypes.string,
};

Picture.defaultProps = {
  title: '',
  src: '',
  alt: '',
};

const mapStateToProps = (state, { id }) => ({
  shareReady: selectorCreators.share.areCountsReady(id)(state),
  lists: selectors.list.getLists(state),
});

export default connect(mapStateToProps)(
  inject(({ connection }, { id }) => ({
    ready: connection.single.media[id] && connection.single.media[id].ready,
    title: connection.single.media[id] && connection.single.media[id].meta.title,
    src: connection.single.media[id] && connection.single.media[id].original.url,
    alt: connection.single.media[id] && connection.single.media[id].alt,
  }))(Picture),
);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
  background: #0e0e0e;
  width: 100%;
`;

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.heights.bar};
  background-color: ${({ theme }) => theme.colors.background};
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - (${({ theme }) => theme.heights.bar } * 2));
`;

const Image = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

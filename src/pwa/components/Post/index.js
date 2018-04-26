import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Lazy from '../../elements/LazyAnimated';
import SameHeight from '../../elements/SameHeight';
import Header from '../../../shared/components/Post/Header';
import Body from './Body';
import Spinner from '../../elements/Spinner';

const lazyRootProps = {
  offsetVertical: 2000,
  offsetHorizontal: 50,
  debounce: false,
  throttle: 100,
};

const Post = ({ type, id, columnId, ready, featuredImageDisplay }) =>
  ready ? (
    <Container id={columnId} featuredImageDisplay={featuredImageDisplay}>
      <LazyRoot
        {...lazyRootProps}
        placeholder={
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
      >
        <Header type={type} id={id} />
        <Body type={type} id={id} columnId={columnId} />
      </LazyRoot>
    </Container>
  ) : (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );

Post.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  columnId: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
  featuredImageDisplay: PropTypes.bool,
};

Post.defaultProps = {
  featuredImageDisplay: true,
};

const mapStateToProps = state => {
  const featuredImage =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'featuredImage')(state) || {};

  return {
    featuredImageDisplay: featuredImage.display,
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { type, id }) => ({
    ready: connection.entity(type, id).ready,
  })),
)(Post);

const Container = styled(SameHeight)`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
  margin-bottom: ${({ featuredImageDisplay }) => (featuredImageDisplay ? '30px' : '')};
  border-bottom: 1px solid #eee;
  min-height: 100vh;
`;

const LazyRoot = styled(Lazy)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

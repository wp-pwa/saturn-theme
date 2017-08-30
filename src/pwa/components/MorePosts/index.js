import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import MorePostsList from './MorePostsList';
import Spinner from '../../elements/Spinner';
import * as selectors from '../../selectors';

const MorePosts = ({ isReady, onlyFollowing, isLastPost }) =>
  <Container>
    <h4>{`${onlyFollowing && !isLastPost ? 'Siguientes' : 'Otros'} artículos`}</h4>
    {!isReady
      ? <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      : <MorePostsList onlyFollowing={onlyFollowing} />}
  </Container>;

MorePosts.propTypes = {
  isReady: PropTypes.bool.isRequired,
  onlyFollowing: PropTypes.bool,
  isLastPost: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLastPost: selectors.post.isLastPost(state),
  isReady: dep('connection', 'selectorCreators', 'isListReady')('currentList')(state)
});

export default connect(mapStateToProps)(MorePosts);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  margin-bottom: 5px;
`;

const SpinnerContainer = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

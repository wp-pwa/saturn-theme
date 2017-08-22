import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import PostItem from './PostItem';
import PostItemFirst from './PostItemFirst';
import PostItemAlt from './PostItemAlt';
import LoadMore from './LoadMore';
import Ad from '../Ad';
import Footer from '../Footer';
import Spinner from '../../elements/Spinner';
import { adsConfig } from '../HtmlToReactConverter/adsInjector';

const PostList = ({ posts, postList, isReady, users }) => {
  if (!isReady) return <Spinner />;

  return (
    <Container>
      {postList.map((id, index) => {
        let PostItemType;

        if (!index) PostItemType = PostItemFirst;
        else if (index % 3 === 0) PostItemType = PostItemAlt;
        else PostItemType = PostItem;

        const { postsBeforeAd, adList } = adsConfig;
        let adConfig;

        if ((index + 1) % postsBeforeAd === 0) adConfig = adList[Math.floor(index / postsBeforeAd)];

        return (
          <div key={id}>
            <PostItemType
              id={id}
              post={posts[id]}
              title={posts[id].title.rendered}
              author={users[posts[id].author]}
            />
            {adConfig ? <Ad {...adConfig} /> : null}
          </div>
        );
      })}
      <LoadMore />
      <Footer />
    </Container>
  );
};

PostList.propTypes = {
  posts: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  isReady: PropTypes.bool.isRequired,
  users: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  posts: dep('connection', 'selectors', 'getPostsEntities')(state),
  postList: dep('connection', 'selectorCreators', 'getListResults')('currentList')(state),
  isReady: dep('connection', 'selectorCreators', 'isListReady')('currentList')(state),
  users: dep('connection', 'selectors', 'getUsersEntities')(state)
});

export default connect(mapStateToProps)(PostList);

const Container = styled.div`
  box-sizing: border-box;
  z-index: 0;

  a {
    text-decoration: none;
    color: inherit;
    margin: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

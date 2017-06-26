import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { GridColumn } from 'mcr-worona';
import { selectorCreators, selectors } from '../../deps';
import Post from './Post';

import styles from './styles.css';

const PostList = ({ posts, postList, isReady, media, users }) =>
  <GridColumn small={{ width: 12 }} className={styles.postList}>
    {isReady &&
      postList.map((id, index) => {
        let type;

        if (!index) {
          type = 'first';
        } else if (index % 3 === 0) {
          type = 'alt';
        } else {
          type = 'normal';
        }

        return (
          <Post
            key={id}
            id={id}
            type={type}
            title={posts[id].title.rendered}
            media={media[posts[id].featured_media]}
            author={users[posts[id].author]}
          />
        );
      })}
  </GridColumn>;

PostList.propTypes = {
  posts: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  isReady: PropTypes.bool.isRequired,
  media: PropTypes.shape({}).isRequired,
  users: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  posts: selectors.getPostsEntities(state),
  postList: selectorCreators.getListResults('currentList')(state),
  isReady: selectorCreators.isListReady('currentList')(state),
  media: selectors.getMediaEntities(state),
  users: selectors.getUsersEntities(state),
});

export default connect(mapStateToProps)(PostList);

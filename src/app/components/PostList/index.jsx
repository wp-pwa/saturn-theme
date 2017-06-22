import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { GridColumn } from 'mcr-worona';
import { selectorCreators, selectors } from '../../deps';
import PostItem from './PostItem';

import styles from './styles.css';

const PostList = ({ posts, postList, isReady, media }) => {
  console.log('loggin from PostList:');
  console.log(media);
  return (
    <GridColumn small={{ width: 12 }} className={styles.postList}>
      {isReady &&
        postList.map(id =>
          <PostItem
            key={id}
            title={posts[id].title.rendered}
            image={media[posts[id].featured_media].source_url}
          />
        )}
    </GridColumn>
  );
};

PostList.propTypes = {
  posts: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  isReady: PropTypes.bool.isRequired,
  media: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  posts: selectors.getPostsEntities(state),
  postList: selectorCreators.getListResults('currentList')(state),
  isReady: selectorCreators.isListReady('currentList')(state),
  media: selectors.getMediaEntities(state),
});

export default connect(mapStateToProps)(PostList);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import fecha from 'fecha';
import Media from './Media';
import Title from './Title';
import Content from './Content';
import { selectors } from '../../deps';

import styles from './styles.css';

const Post = ({ post, isReady, media, users }) =>
  isReady &&
  <div className={styles.postContent}>
    <Media media={media[post.featured_media]} />
    <Title
      title={post.title.rendered}
      author={users[post.author]}
      date={fecha.format(new Date(post.date), 'DD.MM.YYYY - hh:mm [h.]')}
    />
    <Content content={post.content.rendered} />
  </div>;

Post.propTypes = {
  post: PropTypes.shape({}),
  isReady: PropTypes.bool.isRequired,
  media: PropTypes.shape({}),
  users: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  post: selectors.getCurrentSingle(state),
  isReady: selectors.isCurrentSingleReady(state),
  media: selectors.getMediaEntities(state),
  users: selectors.getUsersEntities(state),
});

export default connect(mapStateToProps)(Post);

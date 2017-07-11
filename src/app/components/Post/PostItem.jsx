import React, { PropTypes } from 'react';
import fecha from 'fecha';
import readingTime from 'reading-time';

import Media from '../Media';
import Title from './Title';
import Content from './Content';

import styles from './styles.css';

const PostItem = ({ post, isReady, media, users }) => {
  let minutes;

  if (isReady) minutes = Math.round(readingTime(post.content.rendered).minutes);

  return (
    isReady &&
    <div className={styles.postItem}>
      <Media media={media[post.featured_media]} className={styles.postMedia} />
      <Title
        title={post.title.rendered}
        author={users[post.author]}
        date={fecha.format(new Date(post.date), 'DD.MM.YYYY - hh:mm [h.]')}
        readingTime={minutes}
      />
      <Content content={post.content.rendered} />
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({}),
  isReady: PropTypes.bool.isRequired,
  media: PropTypes.shape({}).isRequired,
  users: PropTypes.shape({}).isRequired,
};

export default PostItem;

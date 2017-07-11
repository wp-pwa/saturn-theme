import React, { PropTypes } from 'react';
import fecha from 'fecha';
import readingTime from 'reading-time';

import Media from '../Media';
import Title from './Title';
import Content from './Content';
import Footer from './Footer';

import styles from './styles.css';

const PostItem = ({ post, isReady, media, users, categories, tags }) => {
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
      <Footer
        categories={post.categories.map(category => categories[category])}
        tags={post.tags.map(tag => tags[tag])}
      />
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({}),
  isReady: PropTypes.bool.isRequired,
  media: PropTypes.shape({}).isRequired,
  users: PropTypes.shape({}).isRequired,
  categories: PropTypes.shape({}).isRequired,
  tags: PropTypes.shape({}).isRequired,
};

export default PostItem;

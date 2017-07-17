import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
// import { createSelector } from 'reselect';
import fecha from 'fecha';
import readingTime from 'reading-time';

import Media from '../Media';
import Title from './Title';
import Content from './Content';
import Footer from './Footer';

// import * as deps from '../../deps';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

import styles from './styles.css';

const PostItem = ({
  post,
  isReady,
  media,
  users,
  categories,
  tags,
  totalShares,
  totalSharesReady,
  sharePost,
}) => {
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
        totalShares={totalShares}
        totalSharesReady={totalSharesReady}
        sharePost={() => sharePost(post.id, 'posts')}
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
  totalShares: PropTypes.number.isRequired,
  totalSharesReady: PropTypes.bool.isRequired,
  sharePost: PropTypes.func.isRequired,
  requestCount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  totalShares: selectors.getTotalShares(state),
  totalSharesReady: selectors.isTotalSharesReady(state),
});

const mapDispatchToProps = dispatch => ({
  requestCount: (id, wpType) => dispatch(actions.shareModal.requestCount({ id, wpType })),
  sharePost: (id, wpType) => {
    dispatch(actions.shareModal.open({ id, wpType }));
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.requestCount(this.props.post.id, 'posts');
    },
  })
)(PostItem);

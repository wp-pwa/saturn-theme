import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import fecha from 'fecha';
import readingTime from 'reading-time';

import Media from '../Media';
import Title from './Title';
import Content from './Content';
import Footer from './Footer';

import * as deps from '../../deps';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

import styles from './styles.css';

const PostItem = ({
  post,
  isMediaReady,
  users,
  categories,
  tags,
  totalShares,
  totalSharesReady,
  sharePost,
  active,
}) => {
  const minutes = Math.round(readingTime(post.content.rendered).minutes);

  return (
    <div className={styles.postItem}>
      {isMediaReady && <Media id={post.featured_media} className={styles.postMedia} />}
      <Title
        title={post.title.rendered}
        author={users[post.author]}
        date={fecha.format(new Date(post.date), 'DD.MM.YYYY - hh:mm [h.]')}
        readingTime={minutes}
        totalShares={totalShares}
        totalSharesReady={totalSharesReady}
        sharePost={() => sharePost(post.id, 'posts')}
      />
      {active &&
        <div>
          <Content content={post.content.rendered} />
          <Footer
            categories={post.categories.map(category => categories[category])}
            tags={post.tags.map(tag => tags[tag])}
          />
        </div>}
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({}),
  users: PropTypes.shape({}).isRequired,
  categories: PropTypes.shape({}).isRequired,
  tags: PropTypes.shape({}).isRequired,
  totalShares: PropTypes.number.isRequired,
  totalSharesReady: PropTypes.bool.isRequired,
  sharePost: PropTypes.func.isRequired,
  isMediaReady: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isMediaReady: deps.selectorCreators.isMediaReady(ownProps.post.featured_media)(state),
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
      if (this.props.active) {
        setTimeout(() => this.props.requestCount(this.props.post.id, 'posts'), 500);
      }
    },
    componentWillUpdate(nextProps) {
      if (nextProps.active && !this.props.active) {
        setTimeout(() => this.props.requestCount(this.props.post.id, 'posts'), 500);
      }
    },
  })
)(PostItem);

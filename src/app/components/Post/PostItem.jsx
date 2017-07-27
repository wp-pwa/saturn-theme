/* global screen */
import React, { Component, PropTypes } from 'react';
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

class PostItem extends Component {
  constructor(props) {
    super(props);

    this.latestScroll = 0;
    this.latestDirection = null;
  }

  componentWillUpdate(nextProps) {
    if (nextProps.activeSlide !== this.props.activeSlide) {
      this.latestDirection = null;
    }
  }

  render() {
    const {
      post,
      isMediaReady,
      users,
      categories,
      tags,
      totalShares,
      totalSharesReady,
      sharePost,
      postHasScrolled,
      hiddenBars,
      showBars,
    } = this.props;

    const minutes = Math.round(readingTime(post.content.rendered).minutes);

    return (
      <div
        className={`${styles.postItem} ${hiddenBars ? styles.postItemOnHiddenBars : ''}`}
        onScroll={({ currentTarget }) => {
          const currentScroll = currentTarget.scrollTop;
          const isScrollingUp = this.latestScroll < currentScroll;
          const fromBottom = currentTarget.scrollHeight - screen.height - currentScroll;

          if (fromBottom < 300 && hiddenBars) showBars();

          if (isScrollingUp) {
            if (this.latestDirection !== 'up') postHasScrolled({ direction: 'up' });

            this.latestDirection = 'up';
          } else if (this.latestDirection !== 'down') {
            postHasScrolled({ direction: 'down' });

            this.latestDirection = 'down';
          }

          this.latestScroll = currentScroll;
        }}
      >
        {isMediaReady && <Media id={post.featured_media} className={styles.postMedia} />}
        <Title
          title={post.title.rendered}
          author={users[post.author]}
          date={fecha.format(new Date(post.date), 'DD.MM.YYYY - HH:mm[h]')}
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
  }
}

PostItem.propTypes = {
  post: PropTypes.shape({}),
  users: PropTypes.shape({}).isRequired,
  categories: PropTypes.shape({}).isRequired,
  tags: PropTypes.shape({}).isRequired,
  totalShares: PropTypes.number.isRequired,
  totalSharesReady: PropTypes.bool.isRequired,
  sharePost: PropTypes.func.isRequired,
  isMediaReady: PropTypes.bool.isRequired,
  postHasScrolled: PropTypes.func.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
  activeSlide: PropTypes.number.isRequired,
  showBars: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isMediaReady: deps.selectorCreators.isMediaReady(ownProps.post.featured_media)(state),
  totalShares: selectors.getTotalShares(state),
  totalSharesReady: selectors.isTotalSharesReady(state),
  hiddenBars: state.theme.postSlider.hiddenBars,
  activeSlide: state.theme.postSlider.final.activeSlide,
});

const mapDispatchToProps = dispatch => ({
  requestCount: (id, wpType) => dispatch(actions.shareModal.requestCount({ id, wpType })),
  sharePost: (id, wpType) => {
    dispatch(actions.shareModal.open({ id, wpType }));
  },
  postHasScrolled: options => dispatch(actions.postSlider.postHasScrolled(options)),
  showBars: () => dispatch(actions.postSlider.showBars()),
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

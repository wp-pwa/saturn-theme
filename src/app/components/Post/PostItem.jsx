/* global screen */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import fecha from 'fecha';
import readingTime from 'reading-time';

import Media from '../Media';
import Title from './Title';
import Content from '../../elements/Content';
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
        className={styles.postItem}
        onScroll={({ currentTarget }) => {
          const top = currentTarget.scrollTop;
          const bottom = currentTarget.scrollHeight - screen.height - top;
          const isScrollingUp = this.latestScroll < top;

          if (top < 60 || bottom < 120) {
            if (hiddenBars) showBars();
          } else if (isScrollingUp) {
            if (this.latestDirection !== 'up') postHasScrolled({ direction: 'up' });

            this.latestDirection = 'up';
          } else if (this.latestDirection !== 'down') {
            postHasScrolled({ direction: 'down' });

            this.latestDirection = 'down';
          }

          this.latestScroll = top;
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
  activeSlide: PropTypes.number.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
  showBars: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isMediaReady: deps.selectorCreators.isMediaReady(ownProps.post.featured_media)(state),
  totalShares: selectors.getTotalShares(state),
  totalSharesReady: selectors.isTotalSharesReady(state),
  activeSlide: state.theme.postSlider.final.activeSlide,
  hiddenBars: state.theme.postSlider.hiddenBars,
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

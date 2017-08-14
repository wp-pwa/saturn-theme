/* global screen */
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import fecha from 'fecha';
import readingTime from 'reading-time';
import styled from 'styled-components';
import Media from '../Media';
import Header from './Header';
import Content from '../../elements/Content';
import Footer from './Footer';
import * as deps from '../../deps';
import * as actions from '../../actions';
import * as selectorCreators from '../../selectorCreators';

class PostItem extends PureComponent {
  constructor(props) {
    super(props);

    this.latestScroll = 0;
    this.latestDirection = null;
  }

  componentDidMount() {
    const { active, allShareCountRequested, post } = this.props;
    if (active) setTimeout(() => allShareCountRequested({ id: post.id, wpType: 'posts' }), 500);
  }

  componentDidUpdate(prevProps) {
    const { active, allShareCountRequested, post, activeSlide } = this.props;

    if (active && !prevProps.active) {
      setTimeout(() => allShareCountRequested({ id: post.id, wpType: 'posts' }), 500);
    }

    if (activeSlide !== prevProps.activeSlide) {
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
      totalCounts,
      areCountsReady,
      shareModalOpeningRequested,
      postHasScrolled,
      hiddenBars,
      barsHaveShown,
      slide,
      active,
    } = this.props;

    const minutes = Math.round(readingTime(post.content.rendered).minutes);

    return (
      <Container
        onScroll={({ currentTarget }) => {
          // This function evaluates scroll distances, then bars are shown/hidden when needed.
          const top = currentTarget.scrollTop;
          const bottom = currentTarget.scrollHeight - screen.height - top;
          const isScrollingUp = this.latestScroll < top;

          // Shows top/bottom bars if the scroll is too close to the top/bottom.
          if (top < 60 || bottom < 120) {
            if (hiddenBars) barsHaveShown();
            // Shows/hiddes bars depending on scroll direction.
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
        {isMediaReady && <Media id={post.featured_media} height="55vh" width="100%" />}
        <Header
          active={active}
          title={post.title.rendered}
          author={users[post.author]}
          date={fecha.format(new Date(post.date), 'DD.MM.YYYY - HH:mm[h]')}
          readingTime={minutes}
          totalCounts={totalCounts}
          areCountsReady={areCountsReady}
          shareModalOpeningRequested={() =>
            shareModalOpeningRequested({ id: post.id, wpType: 'posts' })}
        />
        <Content content={post.content.rendered} slide={slide} />
        <Footer
          categories={post.categories.map(category => categories[category])}
          tags={post.tags.map(tag => tags[tag])}
        />
      </Container>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.shape({}),
  users: PropTypes.shape({}).isRequired,
  categories: PropTypes.shape({}).isRequired,
  tags: PropTypes.shape({}).isRequired,
  totalCounts: PropTypes.number,
  areCountsReady: PropTypes.bool.isRequired,
  shareModalOpeningRequested: PropTypes.func.isRequired,
  isMediaReady: PropTypes.bool.isRequired,
  postHasScrolled: PropTypes.func.isRequired,
  activeSlide: PropTypes.number.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
  barsHaveShown: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  slide: PropTypes.number,
  allShareCountRequested: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isMediaReady: deps.selectorCreators.isMediaReady(ownProps.post.featured_media)(state),
  totalCounts: selectorCreators.shareModal.getTotalCounts(ownProps.post.id)(state),
  areCountsReady: selectorCreators.shareModal.areCountsReady(ownProps.post.id)(state),
  activeSlide: state.theme.postSlider.final.activeSlide,
  hiddenBars: state.theme.postSlider.hiddenBars,
});

const mapDispatchToProps = dispatch => ({
  allShareCountRequested: payload => dispatch(actions.shareModal.allShareCountRequested(payload)),
  shareModalOpeningRequested: payload => {
    dispatch(actions.shareModal.openingRequested(payload));
  },
  postHasScrolled: options => dispatch(actions.postSlider.postHasScrolled(options)),
  barsHaveShown: () => dispatch(actions.postSlider.barsHaveShown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.postLight};
  color: ${({ theme }) => theme.postDark};
  padding-top: ${({ theme }) => theme.titleSize};
  padding-bottom: ${({ theme }) => theme.shareBarHeight};
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  transition: padding-top 0.5s ease;
  z-index: 0;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

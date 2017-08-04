/* global screen */
import React, { Component, PropTypes } from 'react';
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
import * as selectors from '../../selectors';

class PostItem extends Component {
  constructor(props) {
    super(props);

    this.latestScroll = 0;
    this.latestDirection = null;
  }

  componentWillMount() {
    const { active, requestCount, post } = this.props;

    if (active) setTimeout(() => requestCount(post.id, 'posts'), 500);
  }

  componentWillUpdate(nextProps) {
    const { active, requestCount, post, activeSlide } = this.props;

    if (nextProps.active && !active) {
      setTimeout(() => requestCount(post.id, 'posts'), 500);
    }

    if (nextProps.activeSlide !== activeSlide) {
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
      barsHaveShown,
    } = this.props;

    const minutes = Math.round(readingTime(post.content.rendered).minutes);

    return (
      <Container
        onScroll={({ currentTarget }) => {
          const top = currentTarget.scrollTop;
          const bottom = currentTarget.scrollHeight - screen.height - top;
          const isScrollingUp = this.latestScroll < top;

          if (top < 60 || bottom < 120) {
            if (hiddenBars) barsHaveShown();
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
      </Container>
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
  barsHaveShown: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  requestCount: PropTypes.func.isRequired,
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

  a {
    text-decoration: none;
    color: inherit;
  }
`;

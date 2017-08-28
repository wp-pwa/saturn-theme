/* global screen */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Media from '../Media';
import Header from './Header';
import Content from '../../elements/Content';
import Footer from './Footer';
import MorePosts from '../MorePosts';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import * as selectorCreators from '../../selectorCreators';

class PostItem extends Component {
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
      id,
      media,
      post,
      categories,
      tags,
      shareModalOpeningRequested,
      postHasScrolled,
      hiddenBars,
      barsHaveShown,
      slide,
      active
    } = this.props;

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
        <Media id={media} height="55vh" width="100%" />
        <Header
          id={id}
          active={active}
          shareModalOpeningRequested={() =>
            shareModalOpeningRequested({ id: post.id, wpType: 'posts' })}
        />
        <Content content={post.content.rendered} slide={slide} />
        <Footer
          categories={post.categories.map(category => categories[category])}
          tags={post.tags.map(tag => tags[tag])}
        />
        <MorePosts currentPost={post.id} onlyFollowing />
      </Container>
    );
  }
}

PostItem.propTypes = {
  media: PropTypes.number.isRequired,
  post: PropTypes.shape({}),
  users: PropTypes.shape({}).isRequired,
  categories: PropTypes.shape({}).isRequired,
  tags: PropTypes.shape({}).isRequired,
  shareModalOpeningRequested: PropTypes.func.isRequired,
  postHasScrolled: PropTypes.func.isRequired,
  activeSlide: PropTypes.number.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
  barsHaveShown: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  slide: PropTypes.number,
  allShareCountRequested: PropTypes.func.isRequired
};

const mapStateToProps = (state, { id }) => ({
  media: selectorCreators.post.getMedia(id)(state),
  activeSlide: selectors.post.getActiveSlide(state),
  hiddenBars: selectors.post.getHiddenBars(state)
});

const mapDispatchToProps = dispatch => ({
  allShareCountRequested: payload => dispatch(actions.shareModal.allShareCountRequested(payload)),
  shareModalOpeningRequested: payload => {
    dispatch(actions.shareModal.openingRequested(payload));
  },
  postHasScrolled: options => dispatch(actions.postSlider.postHasScrolled(options)),
  barsHaveShown: () => dispatch(actions.postSlider.barsHaveShown())
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

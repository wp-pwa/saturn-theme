/* global screen */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Media from '../Media';
import Header from './Header';
import Content from '../../elements/Content';
import SeoWord from '../../elements/SeoWord';
import TagList from './TagList';
import Comments from '../Comments';
import Carousel from '../Carousel';
import MainFooter from '../Footer';
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
    const { active, allShareCountRequested, id } = this.props;

    if (active) setTimeout(() => allShareCountRequested({ id, wpType: 'posts' }), 500);
  }

  componentDidUpdate(prevProps) {
    const { active, allShareCountRequested, id, activeSlide } = this.props;

    if (active && !prevProps.active) {
      setTimeout(() => allShareCountRequested({ id, wpType: 'posts' }), 500);
    }

    if (activeSlide !== prevProps.activeSlide) {
      this.latestDirection = null;
    }
  }

  render() {
    const {
      id,
      media,
      // postHasScrolled,
      // hiddenBars,
      // barsHaveShown,
      slide,
      active,
      carouselLists,
    } = this.props;

    return (
      <Container
      // onScroll={({ currentTarget }) => {
      //   // This function evaluates scroll distances, then bars are shown/hidden when needed.
      //   // Distance from top
      //   const top = currentTarget.scrollTop;
      //   // Distance from bottom
      //   const bottom = currentTarget.scrollHeight - screen.height - top;
      //
      //   const isScrollingUp = this.latestScroll < top;
      //
      //   // Shows top/bottom bars if the scroll is too close to the top/bottom.
      //   if (top < 60 || bottom < 120) {
      //     if (hiddenBars) barsHaveShown();
      //     // Shows/hiddes bars depending on scroll direction.
      //   } else if (isScrollingUp) {
      //     if (this.latestDirection !== 'up') postHasScrolled({ direction: 'up' });
      //
      //     this.latestDirection = 'up';
      //   } else if (this.latestDirection !== 'down') {
      //     postHasScrolled({ direction: 'down' });
      //
      //     this.latestDirection = 'down';
      //   }
      //
      //   this.latestScroll = top;
      // }}
      >
        <Placeholder active={active} />
        <Media id={media} lazy height="55vh" width="100%" />
        <Header id={id} active={active} />
        <Content
          id={id}
          type={'post'}
          slide={slide}
          elementsToInject={[
            {
              index: 3,
              value: (
                <Carousel
                  title={'Te puede interesar...'}
                  size={'small'}
                  listName={'currentList'}
                  params={{ excludeTo: id, limit: 5 }}
                />
              ),
            },
          ]}
        />
        <TagList id={id} />
        <Comments id={id} active={active} />
        <Carousel
          title={'Siguientes artículos'}
          size={'small'}
          listName={'currentList'}
          params={{ excludeTo: id, limit: 5 }}
        />
        {carouselLists.map(({ title, type, ...list }) => (
          <Carousel
            key={title}
            title={`Más en ${title}`}
            size={'medium'}
            listName={`${type}${list.id}`}
            params={{ id: list.id, type, exclude: id, limit: 5 }}
          />
        ))}
        <SeoWord />
        <MainFooter />
      </Container>
    );
  }
}

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  media: PropTypes.number.isRequired,
  // postHasScrolled: PropTypes.func.isRequired,
  // hiddenBars: PropTypes.bool.isRequired,
  // barsHaveShown: PropTypes.func.isRequired,
  activeSlide: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  slide: PropTypes.number.isRequired,
  allShareCountRequested: PropTypes.func.isRequired,
  carouselLists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state, { id }) => ({
  media: selectorCreators.post.getMedia(id)(state),
  activeSlide: selectors.post.getActiveSlide(state),
  hiddenBars: selectors.post.getHiddenBars(state),
  carouselLists: selectors.list.getCarouselLists(state),
});

const mapDispatchToProps = dispatch => ({
  allShareCountRequested: payload => dispatch(actions.shareModal.allShareCountRequested(payload)),
  shareModalOpeningRequested: payload => {
    dispatch(actions.shareModal.openingRequested(payload));
  },
  // postHasScrolled: options => dispatch(actions.postSlider.postHasScrolled(options)),
  // barsHaveShown: () => dispatch(actions.postSlider.barsHaveShown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);

const Container = styled.div`
  box-sizing: border-box;
  padding-bottom: ${({ theme }) => theme.shareBarHeight};
  background-color: ${({ theme }) => theme.postLight};
  color: ${({ theme }) => theme.postDark};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
`;

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.titleSize};
  background-color: ${({ theme, active }) => (active ? 'transparent' : theme.bgColor)};
`;

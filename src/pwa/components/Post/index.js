import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { connect } from "react-redux";
import styled from "react-emotion";
import Media from "../Media";
import Header from "./Header";
import Content from "../../elements/Content";
import SeoWord from "../../elements/SeoWord";
import TagList from "./TagList";
import Spinner from "../../elements/Spinner";
import Comments from "../Comments";
import Carousel from "../Carousel";
import Footer from "../Footer";
import * as actions from "../../actions";
import * as selectors from "../../selectors";
import * as selectorCreators from "../../selectorCreators";

class Post extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    allShareCountRequested: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    media: PropTypes.number,
    slide: PropTypes.number.isRequired,
    ready: PropTypes.bool.isRequired,
    shareReady: PropTypes.bool.isRequired,
    currentList: PropTypes.shape({}).isRequired,
    carouselLists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  static defaultProps = {
    media: null,
  };

  componentDidMount() {
    const { active, allShareCountRequested, id, shareReady } = this.props;

    if (!shareReady && active) {
      setTimeout(() => allShareCountRequested({ id, wpType: "posts" }), 500);
    }
  }

  componentDidUpdate(prevProps) {
    const { active, allShareCountRequested, id, shareReady } = this.props;

    if (!shareReady && active && !prevProps.active) {
      setTimeout(() => allShareCountRequested({ id, wpType: "posts" }), 500);
    }
  }

  render() {
    const { active, id, media, slide, ready, currentList, carouselLists } = this.props;

    return ready ? (
      <Container>
        <Placeholder />
        <Media id={media} height="55vh" width="100%" />
        <Header id={id} active={active} />
        <Content
          id={id}
          type="post"
          slide={slide}
          elementsToInject={[
            {
              index: 3,
              value: (
                <Carousel
                  title="Te puede interesar..."
                  size="small"
                  type={currentList.type}
                  id={currentList.id}
                  active={active}
                  params={{ excludeTo: id, limit: 5 }}
                />
              ),
            },
          ]}
        />
        <TagList id={id} />
        <Comments id={id} active={active} />
        <Carousel
          title="Siguientes artículos"
          size="small"
          type={currentList.type}
          id={currentList.id}
          active={active}
          params={{ excludeTo: id, limit: 5 }}
        />
        {carouselLists.map(({ title, ...list }) => (
          <Carousel
            key={title}
            title={`Más en ${title}`}
            size="medium"
            type={list.type}
            id={list.id}
            active={active}
            params={{ exclude: id, limit: 5 }}
          />
        ))}
        <SeoWord />
        <Footer />
      </Container>
    ) : (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

const mapStateToProps = (state, { id }) => ({
  shareReady: selectorCreators.shareModal.areCountsReady(id)(state),
  lists: selectors.list.getLists(state).concat(selectors.list.getLists(state).slice(0, 2)),
});

const mapDispatchToProps = dispatch => ({
  allShareCountRequested: payload => dispatch(actions.shareModal.allShareCountRequested(payload)),
  shareModalOpeningRequested: payload => {
    dispatch(actions.shareModal.openingRequested(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }, { id, lists }) => {
    const single = connection.single.post[id];
    const ready = single && single.ready;
    const { listType, listId } = connection.selected.fromList;
    const index = lists.findIndex(item => item.type === listType && item.id === listId);
    const carouselLists = lists.slice(index, index + 3);
    const currentList = carouselLists.splice(0, 1)[0];

    if (ready) {
      return {
        ready,
        media: connection.single.post[id].featured.id,
        currentList,
        carouselLists,
      };
    }

    return {
      ready,
    };
  })(Post),
);

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
  background-color: ${({ theme }) => theme.bgColor};
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

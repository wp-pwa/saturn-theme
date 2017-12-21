import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Media from '../Media';
import Header from './Header';
import Content from '../../elements/Content';
import SeoWord from '../../elements/SeoWord';
import TagList from './TagList';
import Spinner from '../../elements/Spinner';
import Comments from '../Comments';
import Carousel from '../Carousel';
import Footer from '../Footer';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import * as selectorCreators from '../../selectorCreators';

class Post extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    allShareCountRequested: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    media: PropTypes.number,
    slide: PropTypes.number.isRequired,
    ready: PropTypes.bool.isRequired,
    shareReady: PropTypes.bool.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    fromList: PropTypes.shape({}).isRequired
  };

  static defaultProps = {
    media: null
  };

  constructor() {
    super();

    this.state = {
      currentList: null,
      carouselLists: null
    };

    this.setLists = this.setLists.bind(this);
  }

  componentWillMount(nextProps) {
    this.setLists(nextProps);
  }

  componentDidMount() {
    const { active, allShareCountRequested, id, shareReady } = this.props;

    if (!shareReady && active) {
      setTimeout(() => allShareCountRequested({ id, wpType: 'posts' }), 500);
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.lists !== nextProps.lists || this.props.fromList !== nextProps.fromList) {
      this.setLists(nextProps);
    }
  }

  componentDidUpdate(prevProps) {
    const { active, allShareCountRequested, id, shareReady } = this.props;

    if (!shareReady && active && !prevProps.active) {
      setTimeout(() => allShareCountRequested({ id, wpType: 'posts' }), 500);
    }
  }

  setLists(nextProps = this.props) {
    const { listType, listId } = nextProps.fromList;
    const index = nextProps.lists.findIndex(item => item.type === listType && item.id === listId);
    const extendedLists = nextProps.lists.concat(nextProps.lists.slice(0, 2));
    const carouselLists = extendedLists.slice(index, index + 3);
    const currentList = carouselLists.splice(0, 1)[0];

    this.setState({
      currentList,
      carouselLists
    });
  }

  render() {
    const { active, id, media, slide, ready } = this.props;
    const { currentList, carouselLists } = this.state;

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
              doNotPlaceAtTheEnd: true,
              value: (
                <Carousel
                  title="Te puede interesar..."
                  size="small"
                  type={currentList.type}
                  id={currentList.id}
                  active={active}
                  params={{ excludeTo: id, limit: 5 }}
                />
              )
            }
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
  shareReady: selectorCreators.share.areCountsReady(id)(state),
  lists: selectors.list.getLists(state)
});

const mapDispatchToProps = dispatch => ({
  allShareCountRequested: payload => dispatch(actions.share.allShareCountRequested(payload)),
  shareModalOpeningRequested: payload => {
    dispatch(actions.share.openingRequested(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }, { id }) =>
    // const { listType, listId } = connection.selected.fromList;
    // const index = lists.findIndex(item => item.type === listType && item.id === listId);
    // const carouselLists = lists.slice(index, index + 3);
    // const currentList = carouselLists.splice(0, 1)[0];
    ({
      ready: connection.single.post[id] && connection.single.post[id].ready,
      media: connection.single.post[id] && connection.single.post[id].featured.id,
      fromList: connection.selected.fromList
    })
  )(Post)
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

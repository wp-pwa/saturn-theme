import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Header from '../../../shared/components/Post/Header';
import Content from '../../../shared/components/Content';
import Author from '../../../shared/components/Post/Author';
import Fecha from '../../../shared/components/Post/Fecha';
import TagList from './TagList';
import Spinner from '../../elements/Spinner';
import Comments from '../Comments';
// import Carousel from '../Carousel';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import * as selectorCreators from '../../selectorCreators';

class Post extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    allShareCountRequested: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    ready: PropTypes.bool.isRequired,
    shareReady: PropTypes.bool.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    fromList: PropTypes.shape({}).isRequired,
    RouteWaypoint: PropTypes.func.isRequired,
    isNext: PropTypes.bool,
    postAuthorPosition: PropTypes.string,
    postFechaPosition: PropTypes.string,
    featuredImageDisplay: PropTypes.bool,
    infiniteScrollCounter: PropTypes.number.isRequired,
  };

  static defaultProps = {
    isNext: false,
    postAuthorPosition: 'header',
    postFechaPosition: 'header',
    featuredImageDisplay: true,
  };

  constructor() {
    super();

    this.state = {
      currentList: null,
      carouselLists: null,
    };

    this.setLists = this.setLists.bind(this);
  }

  componentWillMount() {
    this.setLists();
  }

  componentDidMount() {
    const { active, allShareCountRequested, id, shareReady } = this.props;

    if (!shareReady && active) {
      setTimeout(() => allShareCountRequested({ id, wpType: 'post' }), 500);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lists !== nextProps.lists || this.props.fromList !== nextProps.fromList) {
      this.setLists(nextProps);
    }
  }

  componentDidUpdate(prevProps) {
    const { active, allShareCountRequested, id, shareReady } = this.props;

    if (!shareReady && active && !prevProps.active) {
      setTimeout(() => allShareCountRequested({ id, wpType: 'post' }), 500);
    }
  }

  setLists(nextProps = this.props) {
    const { listType, listId } = nextProps.fromList;
    let index = nextProps.lists.findIndex(item => item.type === listType && item.id === listId);

    if (index < 0) index = 0;

    const extendedLists = nextProps.lists.concat(nextProps.lists.slice(0, 2));
    const carouselLists = extendedLists.slice(index, index + 3);
    const currentList = carouselLists.splice(0, 1)[0];

    this.setState({
      currentList,
      carouselLists,
    });
  }

  render() {
    const {
      active,
      id,
      ready,
      postAuthorPosition,
      postFechaPosition,
      RouteWaypoint,
      isNext,
      fromList,
      featuredImageDisplay,
      infiniteScrollCounter,
    } = this.props;
    // const { currentList, carouselLists } = this.state;

    return ready ? (
      <RouteWaypoint
        active={active}
        isNext={isNext}
        entity={{
          type: 'post',
          id,
          fromList: { type: fromList.type, id: fromList.id, page: fromList.page },
        }}
        event={{
          category: 'Post',
          action: 'infinite scroll',
          value: infiniteScrollCounter + 1,
        }}
      >
        <Container featuredImageDisplay={featuredImageDisplay}>
          <Header id={id} />
          <Content
            id={id}
            type="post"
            // elementsToInject={[
            //   {
            //     index: 3,
            //     doNotPlaceAtTheEnd: true,
            //     value: (
            //       <Carousel
            //         title="Te puede interesar..."
            //         size="small"
            //         type={currentList.type}
            //         id={currentList.id}
            //         active={active}
            //         params={{ excludeTo: id, limit: 5 }}
            //       />
            //     ),
            //   },
            // ]}
          />
          {(postAuthorPosition === 'footer' || postFechaPosition === 'footer') && (
            <InnerContainer>
              {postAuthorPosition === 'footer' && <Author id={id} />}
              {postFechaPosition === 'footer' && <Fecha id={id} />}
            </InnerContainer>
          )}
          <TagList id={id} />
          <Comments id={id} active={active} />
          {/* <Carousel
            title="Siguientes artículos"
            size="small"
            type={currentList.type}
            id={currentList.id}
            active={active}
            params={{ excludeTo: id, limit: 5 }}
          />
          {carouselLists.map(list => (
            <Carousel
              key={list.id}
              title={`Más en ${list.title}`}
              size="medium"
              type={list.type}
              id={list.id}
              active={active}
              params={{ exclude: id, limit: 5 }}
            />
          ))} */}
        </Container>
      </RouteWaypoint>
    ) : (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const postAuthor =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postAuthor')(state) || {};
  const postFecha =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postFecha')(state) || {};
  const featuredImage =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'featuredImage')(state) || {};

  const RouteWaypoint = dep('connection', 'components', 'RouteWaypoint');

  return {
    shareReady: selectorCreators.share.areCountsReady(id)(state),
    lists: selectors.list.getLists(state),
    postAuthorPosition: postAuthor.position,
    postFechaPosition: postFecha.position,
    featuredImageDisplay: featuredImage.display,
    infiniteScrollCounter: state.theme.events.infiniteScrollCounter.Post,
    RouteWaypoint,
  };
};

const mapDispatchToProps = dispatch => ({
  allShareCountRequested: payload => dispatch(actions.share.allShareCountRequested(payload)),
  shareModalOpeningRequested: payload => {
    dispatch(actions.share.openingRequested(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }, { id }) => ({
    ready: connection.entity('post', id).ready,
    fromList: connection.selectedItem.fromList,
  }))(Post),
);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
  margin-bottom: ${({ featuredImageDisplay }) => (featuredImageDisplay ? '30px' : '')};
  border-bottom: 1px solid #eee;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 20px;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

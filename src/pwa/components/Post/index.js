import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Lazy from '../../elements/LazyAnimated';
import Header from '../../../shared/components/Post/Header';
import Content from '../../../shared/components/Content';
import Author from '../../../shared/components/Post/Author';
import Fecha from '../../../shared/components/Post/Fecha';
import TagList from './TagList';
import Spinner from '../../elements/Spinner';
import Comments from '../Comments';
import Carousel from '../Carousel';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import * as selectorCreators from '../../selectorCreators';

class Post extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    allShareCountRequested: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    ready: PropTypes.bool.isRequired,
    shareReady: PropTypes.bool.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    fromList: PropTypes.shape({}).isRequired,
    RouteWaypoint: PropTypes.func.isRequired,
    postAuthorPosition: PropTypes.string,
    postFechaPosition: PropTypes.string,
    featuredImageDisplay: PropTypes.bool,
    infiniteScrollCounter: PropTypes.number.isRequired,
  };

  static defaultProps = {
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
    const { isSelected, allShareCountRequested, id, shareReady } = this.props;

    if (!shareReady && isSelected) {
      setTimeout(() => allShareCountRequested({ id, wpType: 'post' }), 500);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lists !== nextProps.lists || this.props.fromList !== nextProps.fromList) {
      this.setLists(nextProps);
    }
  }

  componentDidUpdate(prevProps) {
    const { isSelected, allShareCountRequested, id, shareReady } = this.props;

    if (!shareReady && isSelected && !prevProps.isSelected) {
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
      isSelected,
      id,
      ready,
      postAuthorPosition,
      postFechaPosition,
      RouteWaypoint,
      featuredImageDisplay,
      infiniteScrollCounter,
    } = this.props;

    const { currentList, carouselLists } = this.state;

    const routeWaypointEvent = {
      category: 'Post',
      action: 'infinite scroll',
      value: infiniteScrollCounter + 1,
    };

    const rootLazyProps = {
      animate: Lazy.onMount,
      offsetVertical: 300,
      offsetHorizontal: 50,
      debounce: false,
      throttle: 300,
    };

    const contentLazyProps = {
      animate: Lazy.onMount,
      offsetVertical: 300,
      offsetHorizontal: -50,
      debounce: true,
      throttle: 300,
    };

    const carouselCurrentList = {
      size: 'small',
      type: currentList.type,
      id: currentList.id,
      params: { excludeTo: id, limit: 5 },
      isSelected,
    };

    const carousel = [
      {
        index: 3,
        doNotPlaceAtTheEnd: true,
        value: <Carousel title="Te puede interesar..." {...carouselCurrentList} />,
      },
    ];

    return ready ? (
      <Container featuredImageDisplay={featuredImageDisplay}>
        <RouteWaypoint
          isSelected={isSelected}
          item={{ type: 'post', id }}
          event={routeWaypointEvent}
        >
          {/* <React.unstable_AsyncMode> */}
          <Lazy {...rootLazyProps}>
            <Header id={id} />
            <Lazy {...contentLazyProps}>
              <Fragment>
                <Content id={id} type="post" elementsToInject={carousel} />
                {(postAuthorPosition === 'footer' || postFechaPosition === 'footer') && (
                  <InnerContainer>
                    {postAuthorPosition === 'footer' && <Author id={id} />}
                    {postFechaPosition === 'footer' && <Fecha id={id} />}
                  </InnerContainer>
                )}
                <TagList id={id} />
                <Comments id={id} isSelected={isSelected} />
                <Carousel title="Siguientes artículos" {...carouselCurrentList} />
                {carouselLists.map(list => (
                  <Carousel
                    key={list.id}
                    title={`Más en ${list.title}`}
                    size="medium"
                    type={list.type}
                    id={list.id}
                    isSelected={isSelected}
                    params={{ exclude: id, limit: 5 }}
                  />
                ))}
              </Fragment>
            </Lazy>
          </Lazy>
          {/* </React.unstable_AsyncMode> */}
        </RouteWaypoint>
      </Container>
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject(({ connection }, { id }) => ({
    ready: connection.entity('post', id).ready,
    fromList: connection.selectedItem.fromList,
    isSelected: connection.selectedContext.getItem({ item: { type: 'post', id } }).isSelected,
  })),
)(Post);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
  margin-bottom: ${({ featuredImageDisplay }) => (featuredImageDisplay ? '30px' : '')};
  border-bottom: 1px solid #eee;
  min-height: 200vh;
  height: auto;
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

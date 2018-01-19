import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Media from '../../../shared/components/Media';
import Header from './Header';
import Content from '../../../shared/components/Content';
import TagList from './TagList';
import Spinner from '../../elements/Spinner';
import Comments from '../Comments';
import Carousel from '../Carousel';
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
    fromList: PropTypes.shape({}).isRequired,
    noFeaturedImage: PropTypes.bool
  };

  static defaultProps = {
    media: null,
    noFeaturedImage: false
  };

  constructor() {
    super();

    this.state = {
      currentList: null,
      carouselLists: null
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
      carouselLists
    });
  }

  render() {
    const { active, id, media, slide, ready, noFeaturedImage } = this.props;
    const { currentList, carouselLists } = this.state;

    return ready ? (
      <Container>
        <Placeholder />
        {noFeaturedImage ? null : <Media id={media} height="55vh" width="100%" />}
        <Header id={id} />
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
        ))}
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
  lists: selectors.list.getLists(state),
  noFeaturedImage: dep('settings', 'selectorCreators', 'getSetting')('theme', 'noFeaturedImage')(
    state
  )
});

const mapDispatchToProps = dispatch => ({
  allShareCountRequested: payload => dispatch(actions.share.allShareCountRequested(payload)),
  shareModalOpeningRequested: payload => {
    dispatch(actions.share.openingRequested(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }, { id }) => ({
    ready: connection.single.post[id] && connection.single.post[id].ready,
    media: connection.single.post[id] && connection.single.post[id].featured.id,
    fromList: connection.selected.fromList
  }))(Post)
);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
`;

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.heights.bar};
  background-color: ${({ theme }) => theme.colors.background};
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import CarouselItem from './CarouselItem';
import Spinner from '../../elements/Spinner';
import { single } from '../../contexts';
import Lazy from '../../elements/LazyAnimated';

class Carousel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ready: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    listRequested: PropTypes.func.isRequired,
    entities: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
    isCurrentList: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    entities: null,
  };

  static lazyProps = {
    animate: Lazy.onMount,
    ignoreSsr: true,
    offsetVertical: 500,
    offsetHorizontal: -50,
    debounce: false,
    throttle: 300,
  };

  constructor() {
    super();

    this.state = {
      list: null,
    };

    this.requestList = this.requestList.bind(this);
    this.filterList = this.filterList.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    if (this.props.entities && this.props.entities.length) {
      this.filterList();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.entities !== nextProps.entities) {
      this.filterList(nextProps);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.entities !== nextProps.entities ||
      this.props.ready !== nextProps.ready ||
      this.props.fetching !== nextProps.fetching
    );
  }

  requestList() {
    const { type, id, listRequested, ready, fetching, isCurrentList } = this.props;

    if (!isCurrentList && !ready && !fetching) {
      listRequested({ list: { type, id, page: 1 } });
    }
  }

  filterList(props = this.props) {
    const { params, entities } = props;

    let list;

    if (params.exclude) {
      list = entities.filter(entitie => entitie.id !== params.exclude);
    } else if (params.excludeTo) {
      const index = entities.findIndex(entitie => entitie.id === params.excludeTo);
      list = entities.slice(index + 1);
    }

    if (params.limit) {
      list = list.slice(0, 5);
    }

    this.setState({
      list,
    });
  }

  renderItem(post) {
    if (!post) return null;

    const { id, type } = this.props;
    const list = { type, id, page: 1, extract: 'horizontal' };
    const item = { type: 'post', id: post.id, fromList: { type, id, page: 1 } };
    const context = single(list);

    return (
      <CarouselItem
        key={post.id}
        id={post.id}
        item={item}
        context={context}
        media={post.featured && post.featured.id}
        title={post.title}
      />
    );
  }

  render() {
    const { title, size, ready, fetching } = this.props;
    const { list } = this.state;

    return !list || (list && list.length) ? (
      <Container className="carousel">
        <Lazy onContentVisible={this.requestList} {...Carousel.lazyProps}>
          <Fragment>
            <Title>{title}</Title>
            <InnerContainer size={size}>
              {ready && !fetching && list ? <List>{list.map(this.renderItem)}</List> : <Spinner />}
            </InnerContainer>
          </Fragment>
        </Lazy>
      </Container>
    ) : null;
  }
}

const mapDispatchToProps = dispatch => ({
  listRequested: payload => dispatch(dep('connection', 'actions', 'listRequested')(payload)),
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ connection }, { id, type }) => {
    const { fromList } = connection.selectedItem;
    const isCurrentList = id === fromList.id && type === fromList.type;

    return {
      isCurrentList,
      entities: connection.list(type, id).entities,
      ready: connection.list(type, id).ready,
      fetching: connection.list(type, id).fetching,
    };
  }),
)(Carousel);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  margin-bottom: 30px;
`;

const Title = styled.h4`
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 0 15px;
`;

const InnerContainer = styled.div`
  height: ${({ size }) => {
    if (size === 'small') return 20;
    if (size === 'medium') return 30;
    if (size === 'large') return 40;
    return 220;
  }}vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

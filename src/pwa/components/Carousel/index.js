import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import CarouselItem from './CarouselItem';
import Spinner from '../../elements/Spinner';
import * as selectors from '../../selectors';

class Carousel extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ready: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    listRequested: PropTypes.func.isRequired,
    ssr: PropTypes.bool.isRequired,
    entities: PropTypes.arrayOf(PropTypes.shape({})),
    exclude: PropTypes.number, // eslint-disable-line
    excludeTo: PropTypes.number, // eslint-disable-line
    limit: PropTypes.number // eslint-disable-line
  };

  static defaultProps = {
    entities: null,
    exclude: null,
    excludeTo: null,
    limit: null
  };

  constructor() {
    super();

    this.state = {
      list: null
    };

    this.filterList = this.filterList.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    if (this.props.entities && this.props.entities.length) {
      this.filterList();
    }
  }

  componentDidMount() {
    const { listRequested, ssr } = this.props;

    if (!ssr) listRequested();
  }

  componentWillReceiveProps(nextProps) {
    const { listRequested, ssr, entities } = this.props;

    if (ssr !== nextProps.ssr) listRequested();

    if (entities !== nextProps.entities && nextProps.entities.length) {
      this.filterList(nextProps);
    }
  }

  filterList(props = this.props) {
    const { exclude, excludeTo, limit, entities } = props;

    let list;

    if (exclude) {
      list = entities.filter(entitie => entitie.id !== exclude);
    } else if (excludeTo) {
      const index = entities.findIndex(entitie => entitie.id === excludeTo);
      list = entities.slice(index + 1);
    }

    if (limit) {
      list = list.slice(0, 5);
    }

    this.setState({
      list
    });
  }

  renderItem(post) {
    if (!post) return null;

    const { id, type } = this.props;
    const list = { listType: type, listId: id, extract: true };
    const selected = { singleType: 'post', singleId: post.id };
    const context = selectors.contexts.singleLink(list);

    return (
      <CarouselItem
        key={post.id}
        id={post.id}
        selected={selected}
        context={context}
        media={post.featured.id}
        title={post.title}
      />
    );
  }

  render() {
    const { title, size, ready, fetching } = this.props;
    const { list } = this.state;

    return !list || (list && list.length > 0) ? (
      <Container>
        <Title>{title}</Title>
        <InnerContainer size={size}>
          {ready && !fetching ? <List>{list && list.map(this.renderItem)}</List> : <Spinner />}
        </InnerContainer>
      </Container>
    ) : null;
  }
}

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state)
});

const mapDispatchToProps = (dispatch, { id, type }) => ({
  listRequested: () =>
    setTimeout(
      () => dispatch(dep('connection', 'actions', 'listRequested')({ listType: type, listId: id })),
      1
    )
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject(({ connection }, { id, type }) => {
    const list = connection.list[type] && connection.list[type][id];

    return {
      entities: list && list.entities,
      ready: !!list && list.ready,
      fetching: !!list && list.fetching
    };
  })
)(Carousel);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
`;

const Title = styled.h4`
  margin: 0;
  margin-top: 20px;
  padding: 0 15px 10px 15px;
`;

const InnerContainer = styled.div`
  height: ${({ size }) => {
    if (size === 'small') return 20;
    if (size === 'medium') return 30;
    if (size === 'large') return 40;
    return 220;
  }}vh;
  width: 100%;
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
  margin: 0 !important;
  padding: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import universal from 'react-universal-component';
import RouteWaypoint from '../RouteWaypoint';
import Spinner from '../../elements/Spinner';
import { SpinnerContainer } from './styled';

const loading = (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

const List = universal(import('../List'), { loading });
const Post = universal(import('../Post'), { loading });
const Page = universal(import('../Page'), { loading });
const Media = universal(import('../Media'), { loading });

class Item extends Component {
  static propTypes = {
    column: PropTypes.shape({}).isRequired,
    item: PropTypes.shape({
      mstId: PropTypes.string,
      type: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      page: PropTypes.number,
    }).isRequired,
    isSelectedColumn: PropTypes.bool.isRequired,
    nextItem: PropTypes.bool,
  };

  static defaultProps = {
    nextItem: false,
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { nextItem, isSelectedColumn } = this.props;
    return nextItem && !isSelectedColumn && nextProps.isSelectedColumn;
  }

  renderItem() {
    const { mstId, id, type, page } = this.props.item;

    if (page) {
      Post.preload();
      return <List key={mstId} type={type} id={id} page={page} columnId={mstId} />;
    }

    List.preload();

    if (type === 'page') return <Page key={mstId} id={id} columnId={mstId} />;
    if (type === 'media') return <Media key={mstId} id={id} />;
    return <Post key={mstId} type={type} id={id} columnId={mstId} />;
  }

  render() {
    const { item, column } = this.props;
    return (
      <RouteWaypoint item={item} column={column}>
        {this.renderItem()}
      </RouteWaypoint>
    );
  }
}

export default inject((_stores, { column, nextNonVisited, item }) => ({
  isSelectedColumn: column.isSelected,
  item: nextNonVisited ? column.parentContext.nextNonVisited : item,
}))(Item);

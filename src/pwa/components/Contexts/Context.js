import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import ListBar from '../ListBar';
import PostBar from '../PostBar';
import MediaBar from '../MediaBar';
import Column from './Column';
import ShareBar from '../ShareBar';
import Slider from '../Slider';

class Context extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedColumnIndex: PropTypes.number.isRequired,
    bar: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired,
    routeChangeRequested: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ssr: props.ssr,
    };

    this.renderColumn = this.renderColumn.bind(this);
    this.handleOnChangeIndex = this.handleOnChangeIndex.bind(this);
  }

  componentDidMount() {
    if (window) window.scrollTo(0, 0); // reset scroll when accessing a new context
  }

  handleOnChangeIndex({ index, fromProps }) {
    if (fromProps) return;

    const { routeChangeRequested, columns } = this.props;
    const { type, id, page } = columns[index].selectedItem;

    // WARNING - before using just mobx-state-tree, these events
    //           were sent together with the redux events payload:
    //
    // event: { category: component, action: 'swipe' }
    //
    // let component;
    //
    // if (bar === 'list') component = 'List';
    // if (bar === 'single') component = 'Post';
    // if (bar === 'media') component = 'Media';

    routeChangeRequested({
      selectedItem: { type, id, page },
      method: 'push',
    });
  }

  renderColumn(column, index) {
    const { ssr, bar, selectedColumnIndex } = this.props;
    const contextSsr = this.state.ssr;

    const { mstId, items, isSelected } = column;

    if (index < selectedColumnIndex - 1 || index > selectedColumnIndex + 1)
      return <div key={mstId} />;

    if (!isSelected && ssr) return <div key={mstId} />;

    return (
      <Column
        key={mstId}
        mstId={mstId}
        items={items}
        bar={bar}
        ssr={contextSsr}
      />
    );
  }

  render() {
    const { columns, selectedColumnIndex, bar } = this.props;

    return (
      <Fragment>
        {bar === 'single' && <PostBar key="post-bar" />}
        <React.unstable_AsyncMode>
          {bar === 'list' && <ListBar key="list-bar" />}
          {bar === 'media' && <MediaBar key="media-bar" />}
        </React.unstable_AsyncMode>
        <Slider
          key="slider"
          index={selectedColumnIndex}
          onTransitionEnd={this.handleOnChangeIndex}
        >
          {columns.map(this.renderColumn)}
        </Slider>
        {(bar === 'single' || bar === 'media') && <ShareBar key="share-bar" />}
      </Fragment>
    );
  }
}

export default inject(({ stores: { connection, build } }) => ({
  columns: connection.selectedContext.columns,
  selectedColumnIndex: connection.selectedColumn.index,
  ssr: build.isSsr,
  routeChangeRequested: connection.routeChangeRequested,
}))(Context);

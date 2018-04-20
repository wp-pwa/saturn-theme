import React, { Component, Fragment } from 'react';
import { unstable_deferredUpdates } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inject } from 'mobx-react';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import ListBar from '../ListBar';
import PostBar from '../PostBar';
import MediaBar from '../MediaBar';
import Column from './Column';
import ShareBar from '../ShareBar';
import Slider from '../../elements/Slider';

class Context extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedColumnIndex: PropTypes.number.isRequired,
    bar: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired,
    routeChangeRequested: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(nextProps, { columns: stateColumns = [] }) {
    const { ssr, columns = [], selectedColumnIndex } = nextProps;

    const newColumns = [...stateColumns];

    columns.forEach((column, index) => {
      const { isSelected, mstId } = column;

      if (
        (!isSelected && ssr) ||
        (index < selectedColumnIndex - 1 || index > selectedColumnIndex + 1)
      ) {
        newColumns[index] = newColumns[index] || mstId; // check this
      } else {
        newColumns[index] = column;
      }
    });

    console.log(newColumns);

    return { columns: newColumns };
  }

  constructor(props) {
    super(props);

    this.state = {
      ssr: props.ssr,
    };

    console.log('instantiated!');

    this.renderColumn = this.renderColumn.bind(this);
    this.handleOnChangeIndex = this.handleOnChangeIndex.bind(this);
  }

  componentDidMount() {
    if (window) window.scrollTo(0, 0); // reset scroll when accessing a new context
  }

  componentDidUpdate() {
    const { selectedColumnIndex } = this.props;

    const hasToRemoveColumns = this.state.columns.filter(c => (typeof c === 'object')).length > 3;

    if (hasToRemoveColumns) {
      const columns = this.state.columns.map((column, index) => {
        if (index < selectedColumnIndex - 1 || index > selectedColumnIndex + 1) {
          return typeof column === 'object' ? column.mstId : column;
        }
        return column;
      });

      setTimeout(() =>
        unstable_deferredUpdates(() => {
          console.log('REMOVING ASYNCHRONOUSLY', columns);
          this.setState({ columns });
        }),
        10,
      );
    }
  }

  handleOnChangeIndex({ index, fromProps }) {
    if (fromProps) return;

    const { routeChangeRequested, columns, bar } = this.props;
    const { type, id, page } = columns[index].selectedItem;

    // This will be used in analytics events.
    let component;

    if (bar === 'list') component = 'List';
    if (bar === 'single') component = 'Post';
    if (bar === 'media') component = 'Media';

    routeChangeRequested({
      selectedItem: {
        type,
        id,
        page,
      },
      method: 'push',
      event: {
        category: component,
        action: 'swipe',
      },
    });
  }

  renderColumn(column) {
    const { bar } = this.props;
    const contextSsr = this.state.ssr;

    if (typeof column === 'string') {
      return <div key={column} />;
    }

    return (
      <Column
        key={column.mstId}
        mstId={column.mstId}
        items={column.items}
        isSelected={column.isSelected}
        bar={bar}
        ssr={contextSsr}
      />
    );
  }

  render() {
    const { selectedColumnIndex, bar } = this.props;
    const { columns } = this.state;

    return (
      <Fragment>
        {bar === 'single' && <PostBar key="post-bar" />}
        <React.unstable_AsyncMode>
          {bar === 'list' && <ListBar key="list-bar" />}
          {bar === 'media' && <MediaBar key="media-bar" />}
        </React.unstable_AsyncMode>
        <Slider key="slider" index={selectedColumnIndex} onTransitionEnd={this.handleOnChangeIndex}>
          {columns.map(this.renderColumn)}
        </Slider>
        {(bar === 'single' || bar === 'media') && (
          <React.unstable_AsyncMode>
            <ShareBar key="share-bar" />
          </React.unstable_AsyncMode>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

const mapDispatchToProps = dispatch => ({
  routeChangeRequested: payload =>
    dispatch(dep('connection', 'actions', 'routeChangeRequested')(payload)),
});

const Context2 = props => <Context {...props} />;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject(({ connection }) => ({
    columns: connection.selectedContext.columns,
    columnsLength: connection.selectedContext.columns.length,
    selectedColumnIndex: connection.selectedColumn.index,
  })),
)(Context2);

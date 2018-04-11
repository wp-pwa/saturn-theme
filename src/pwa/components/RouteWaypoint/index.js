import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { noop } from 'lodash';
import { dep } from 'worona-deps';

class RouteWaypoint extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    page: PropTypes.number,
    children: PropTypes.node.isRequired,
    infiniteScrollCounter: PropTypes.number.isRequired,
    moveItem: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    isSelectedItem: PropTypes.bool.isRequired,
    isInSelectedColumn: PropTypes.bool.isRequired,
    isNextNonVisited: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    page: undefined,
  };

  constructor(props) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }

  async changeRoute() {
    const {
      moveItem,
      changeRoute,
      type,
      id,
      page,
      isSelectedItem,
      isInSelectedColumn,
      isNextNonVisited,
      infiniteScrollCounter,
    } = this.props;

    const item = { type, id, page };

    if (!isSelectedItem && !page && isNextNonVisited) await moveItem({ item });

    changeRoute({
      selectedItem: item,
      method: isInSelectedColumn ? 'replace' : 'push',
      event: {
        category: page ? 'List' : 'Post',
        action: 'infinite scroll',
        value: infiniteScrollCounter,
      },
    });
  }

  render() {
    const { isInSelectedColumn, children } = this.props;
    return (
      <Waypoint
        bottomOffset="29%"
        topOffset="70%"
        scrollableAncestor="window"
        fireOnRapidScroll
        onEnter={isInSelectedColumn ? this.changeRoute : noop}
      >
        <div>{children}</div>
      </Waypoint>
    );
  }
}

const mapStateToProps = state => ({
  infiniteScrollCounter: state.theme.events.infiniteScrollCounter.Post + 1,
});

const mapDispatchToProps = dispatch => ({
  moveItem(payload) {
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch(dep('connection', 'actions', 'moveItemToColumn')(payload));
        resolve();
      });
    });
  },
  changeRoute(payload) {
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch(dep('connection', 'actions', 'routeChangeRequested')(payload));
        resolve();
      });
    });
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject(({ connection }, { type, id, page, columnIndex }) => {
    const waypointItem = connection.selectedContext.getItem({ item: { type, id, page } });
    return {
      isSelectedItem: connection.selectedItem === waypointItem,
      isInSelectedColumn: connection.selectedColumn.index === columnIndex,
      isNextNonVisited: connection.selectedContext.nextNonVisited === waypointItem,
    };
  }),
)(RouteWaypoint);

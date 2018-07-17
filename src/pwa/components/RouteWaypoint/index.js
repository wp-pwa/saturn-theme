import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { computed } from 'mobx';
import { inject } from 'mobx-react';

class RouteWaypoint extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    page: PropTypes.number,
    children: PropTypes.node.isRequired,
    moveItem: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    isSelectedItem: PropTypes.bool.isRequired,
    isSelectedColumn: PropTypes.bool.isRequired,
    isNextNonVisited: PropTypes.bool.isRequired,
    sendEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    page: undefined,
  };

  constructor(props) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute() {
    const {
      moveItem,
      changeRoute,
      type,
      id,
      page,
      isSelectedItem,
      isSelectedColumn,
      isNextNonVisited,
      sendEvent,
    } = this.props;

    const item = { type, id, page };

    if (!isSelectedColumn || isSelectedItem) return;

    if (!isSelectedItem && !page && isNextNonVisited) moveItem({ item });

    changeRoute({
      selectedItem: item,
      method: isSelectedColumn ? 'replace' : 'push',
    });

    sendEvent({ category: page ? 'List' : 'Post', action: 'infinite scroll' });
  }

  render() {
    const { children } = this.props;
    return (
      <Waypoint
        bottomOffset="49.999999999999%"
        topOffset="50%"
        scrollableAncestor="window"
        fireOnRapidScroll
        onEnter={this.changeRoute}
      >
        <div>{children}</div>
      </Waypoint>
    );
  }
}

export default inject(
  ({ stores: { connection, analytics } }, { type, id, page, columnId }) => {
    const waypointItem = connection.selectedContext.getItem({
      item: { type, id, page },
    });

    return {
      moveItem: connection.moveItemToColumn,
      changeRoute: connection.routeChangeRequested,
      isSelectedItem: waypointItem.isSelected,
      isSelectedColumn: connection.selectedContext.getColumn(columnId)
        .isSelected,
      isNextNonVisited: computed(
        () => connection.selectedContext.nextNonVisited === waypointItem,
      ).get(),
      sendEvent: analytics.sendEvent,
    };
  },
)(RouteWaypoint);

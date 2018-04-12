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
    moveItem: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    isSelectedItem: PropTypes.bool.isRequired,
    isSelectedColumn: PropTypes.bool.isRequired,
    isNextNonVisited: PropTypes.bool.isRequired,
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
    } = this.props;

    const item = { type, id, page };

    if (!isSelectedItem && !page && isNextNonVisited) moveItem({ item });

    changeRoute({
      selectedItem: item,
      method: isSelectedColumn ? 'replace' : 'push',
      event: {
        category: page ? 'List' : 'Post',
        action: 'infinite scroll',
      },
    });
  }

  render() {
    const { isSelectedColumn, children } = this.props;
    return (
      <Waypoint
        bottomOffset="49.999999999999%"
        topOffset="50%"
        scrollableAncestor="window"
        fireOnRapidScroll
        onEnter={isSelectedColumn ? this.changeRoute : noop}
      >
        <div>{children}</div>
      </Waypoint>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  moveItem(payload) {
    dispatch(dep('connection', 'actions', 'moveItemToColumn')(payload));
  },
  changeRoute(payload) {
    dispatch(dep('connection', 'actions', 'routeChangeRequested')(payload));
  },
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ connection }, { type, id, page }) => {
    const waypointItem = connection.selectedContext.getItem({ item: { type, id, page } });

    return {
      isSelectedItem: waypointItem.isSelected,
      isNextNonVisited: connection.selectedContext.nextNonVisited === waypointItem,
    };
  }),
)(RouteWaypoint);

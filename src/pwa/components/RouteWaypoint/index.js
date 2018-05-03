import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';

class RouteWaypoint extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    item: PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      page: PropTypes.number,
    }).isRequired,
    moveItem: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    isSelectedItem: PropTypes.bool.isRequired,
    isSelectedColumn: PropTypes.bool.isRequired,
    isNextNonVisited: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.children !== nextProps.children;
  }

  changeRoute() {
    const {
      item,
      moveItem,
      changeRoute,
      isSelectedItem,
      isSelectedColumn,
      isNextNonVisited,
    } = this.props;

    if (!isSelectedColumn || isSelectedItem) return;

    if (!isSelectedItem && !item.page && isNextNonVisited) moveItem({ item });

    changeRoute({
      selectedItem: item,
      method: isSelectedColumn ? 'replace' : 'push',
      event: {
        category: item.page ? 'List' : 'Post',
        action: 'infinite scroll',
      },
    });
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
  inject((stores, { item, column }) => ({
    isSelectedItem: item.isSelected,
    isSelectedColumn: column.isSelected,
    isNextNonVisited: computed(() => column.parentContext.nextNonVisited === item).get(),
  })),
)(RouteWaypoint);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import Slider from '../../elements/Slider';

class SliderManager extends Component {
  static propTypes = {
    bar: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    routeChangeRequested: PropTypes.func.isRequired,
    selectedColumnIndex: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleOnChangeIndex = this.handleOnChangeIndex.bind(this);
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

  render() {
    const { selectedColumnIndex, children } = this.props;
    return (
      <Slider key="slider" index={selectedColumnIndex} onTransitionEnd={this.handleOnChangeIndex}>
        {children}
      </Slider>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  routeChangeRequested: payload =>
    dispatch(dep('connection', 'actions', 'routeChangeRequested')(payload)),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  inject((_stores, { context }) => ({
    bar: context.options.bar,
    columns: context.columns,
    selectedColumnIndex: context.selectedColumn.index,
  })),
)(SliderManager);

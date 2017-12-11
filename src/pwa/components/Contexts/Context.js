import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import HeaderList from '../HeaderList';
import HeaderSingle from '../HeaderSingle';
import Column from './Column';
import ShareBar from '../ShareBar';
import Slider from '../../elements/Swipe';

class Context extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedColumn: PropTypes.number.isRequired,
    bar: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired,
    routeChangeRequested: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.renderColumn = this.renderColumn.bind(this);
    this.handleOnChangeIndex = this.handleOnChangeIndex.bind(this);
  }

  handleOnChangeIndex({ index, fromProps }) {
    if (fromProps) return;

    const { routeChangeRequested, columns } = this.props;
    const { listId, listType, singleType, singleId } = columns[index].selected;
    const selected = {};

    if (singleType) {
      selected.singleType = singleType;
      selected.singleId = singleId;
    } else {
      selected.listType = listType;
      selected.listId = listId;
    }

    routeChangeRequested({
      selected,
      method: 'push',
    });
  }

  renderColumn(column, index) {
    const { selectedColumn, ssr } = this.props;

    if (index < selectedColumn - 1 || index > selectedColumn + 1) return <div key={index} />;

    if (selectedColumn !== index && ssr) return <div key={index} />;

    const { items } = column;

    return <Column key={index} items={items} active={selectedColumn === index} slide={index} />;
  }

  render() {
    const { columns, selectedColumn, bar } = this.props;

    return [
      bar === 'list' && <HeaderList key="header-list" />,
      bar === 'single' && <HeaderSingle key="header-single" />,
      <Slider key="slider" index={selectedColumn} onChangeIndex={this.handleOnChangeIndex}>
        {columns.map(this.renderColumn)}
      </Slider>,
      bar === 'single' && <ShareBar key="share-bar" />,
    ];
  }
}

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

const mapDispatchToProps = dispatch => ({
  routeChangeRequested: payload =>
    dispatch(dep('connection', 'actions', 'routeChangeRequested')(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Context);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inject } from 'mobx-react';
import { dep } from 'worona-deps';
import { compose } from 'recompose';
import ListBar from '../ListBar';
import PostBar from '../PostBar';
import PictureBar from '../PictureBar';
import Column from './Column';
import ShareBar from '../ShareBar';
import Slider from '../../elements/Swipe';

class Context extends Component {
  static propTypes = {
    columns: PropTypes.shape({}).isRequired,
    selectedColumn: PropTypes.number.isRequired,
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
    const { listId, listType, page, singleType, singleId } = columns[index].selected;
    const selected = {};

    if (singleType) {
      selected.singleType = singleType;
      selected.singleId = singleId;
    } else {
      selected.listType = listType;
      selected.listId = listId;
      selected.page = page;
    }

    routeChangeRequested({
      selected,
      method: 'push',
    });
  }

  renderColumn(column, index) {
    const { selectedColumn, ssr } = this.props;
    const contextSsr = this.state.ssr;

    if (index < selectedColumn - 1 || index > selectedColumn + 1) return <div key={index} />;

    if (selectedColumn !== index && ssr) return <div key={index} />;

    const { items } = column;

    return (
      <Column
        key={index}
        items={items}
        active={selectedColumn === index}
        slide={index}
        ssr={contextSsr}
      />
    );
  }

  render() {
    const { columns, selectedColumn, bar } = this.props;

    return [
      bar === 'list' && <ListBar key="list-bar" />,
      bar === 'single' && <PostBar key="post-bar" />,
      bar === 'picture' && <PictureBar key="header-picture" />,
      <Slider key="slider" index={selectedColumn} onTransitionEnd={this.handleOnChangeIndex}>
        {columns.filter(({ selected }) => selected.id).map(this.renderColumn)}
      </Slider>,
      (bar === 'single' || bar === 'picture') && <ShareBar key="share-bar" />,
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject(({ connection }, { context }) => ({
    columns: connection.contexts[context].columns,
    length: connection.contexts[context].columns.length, // This line forces an update on columns when new elements are added.
  })),
)(Context);

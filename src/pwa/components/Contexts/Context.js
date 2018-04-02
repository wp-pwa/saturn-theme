import React, { Component, Fragment } from 'react';
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
import Slider from '../../elements/Swipe';

class Context extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    activeColumn: PropTypes.number.isRequired,
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

    const { routeChangeRequested, columns, bar } = this.props;
    const { type, id, page } = columns[index].selectedItem;

    // This will be used in analytics.
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

  renderColumn(column, index) {
    const { activeColumn, ssr, bar } = this.props;
    const contextSsr = this.state.ssr;

    if (index < activeColumn - 1 || index > activeColumn + 1) return <div key={index} />;

    if (activeColumn !== index && ssr) return <div key={index} />;

    const { mstId, items } = column;

    return (
      <Column
        key={mstId}
        items={items}
        active={activeColumn === index}
        slide={index}
        bar={bar}
        ssr={contextSsr}
      />
    );
  }

  render() {
    const { columns, activeColumn, bar } = this.props;

    return (
      <Fragment>
        {bar === 'list' && <ListBar key="list-bar" />}
        {bar === 'single' && <PostBar key="post-bar" />}
        {bar === 'media' && <MediaBar key="media-bar" />}
        <Slider key="slider" index={activeColumn} onTransitionEnd={this.handleOnChangeIndex}>
          {columns.filter(({ selectedItem: id }) => id).map(this.renderColumn)}
        </Slider>
        {(bar === 'single' || bar === 'media') && <ShareBar key="share-bar" />}
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject(({ connection }) => ({
    type: connection.selectedItem.type,
    columns: connection.selectedContext.columns,
  })),
)(Context);

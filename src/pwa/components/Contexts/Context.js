import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import styled, { withTheme } from 'styled-components';
import { compose } from 'recompose';
import ListBar from '../ListBar';
import PostBar from '../PostBar';
import MediaBar from '../MediaBar';
import Column from './Column';
import ShareBar from '../ShareBar';
import Slider from '../Slider';
import SlotInjector from '../../../shared/components/SlotInjector';

class Context extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedColumnIndex: PropTypes.number.isRequired,
    bar: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired,
    routeChangeRequested: PropTypes.func.isRequired,
    sendEvent: PropTypes.func.isRequired,
    isSelectedTypeLatest: PropTypes.bool.isRequired,
    theme: PropTypes.shape({}).isRequired,
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

    const { routeChangeRequested, columns, sendEvent, bar } = this.props;
    const { type, id, page } = columns[index].selectedItem;

    // Analytics event
    let component;
    if (bar === 'list') component = 'List';
    if (bar === 'single') component = 'Post';
    if (bar === 'media') component = 'Media';
    sendEvent({ category: component, action: 'swipe' });

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
    const {
      columns,
      selectedColumnIndex,
      bar,
      isSelectedTypeLatest,
      theme,
    } = this.props;
    return (
      <Fragment>
        <NavbarWrapper>
          <SlotBeforeNavbar />
          {bar === 'single' && <PostBar key="post-bar" />}
          <React.unstable_ConcurrentMode>
            {bar === 'list' && <ListBar key="list-bar" />}
            {bar === 'media' && <MediaBar key="media-bar" />}
          </React.unstable_ConcurrentMode>
        </NavbarWrapper>
        <Slider
          key="slider"
          index={selectedColumnIndex}
          onTransitionEnd={this.handleOnChangeIndex}
          transitionTime={theme.transitionTime}
        >
          {columns.map(this.renderColumn)}
        </Slider>
        {((bar === 'single' && !isSelectedTypeLatest) || bar === 'media') && (
          <ShareBar key="share-bar" />
        )}
      </Fragment>
    );
  }
}

export default compose(
  inject(({ stores: { connection, build, analytics } }) => ({
    columns: connection.selectedContext.columns,
    isSelectedTypeLatest: computed(
      () => connection.selectedItem.type === 'latest',
    ).get(),
    selectedColumnIndex: connection.selectedColumn.index,
    ssr: build.isSsr,
    routeChangeRequested: connection.routeChangeRequested,
    sendEvent: analytics.sendEvent,
  })),
  withTheme,
)(Context);

const SlotBeforeNavbar = inject(({ stores: { connection } }) => ({
  item: connection.selectedItem,
  position: 'before navbar',
  isAboveTheFold: true,
}))(SlotInjector);

const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 60;
`;

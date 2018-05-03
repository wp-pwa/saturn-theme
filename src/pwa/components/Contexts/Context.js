import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import { computed } from 'mobx';
import { inject } from 'mobx-react';
import ListBar from '../ListBar';
import PostBar from '../PostBar';
import MediaBar from '../MediaBar';
import Column from './Column';
import ShareBar from '../ShareBar';
import SliderManager from './SliderManager';

class Context extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    context: PropTypes.shape({}).isRequired,
    bar: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      ssr: props.ssr,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0); // reset scroll when accessing a new context
  }

  render() {
    const { columns, bar, context } = this.props;
    const contextSsr = this.state.ssr;
    return (
      <Fragment>
        {bar === 'single' && <PostBar key="post-bar" />}
        <React.unstable_AsyncMode>
          {bar === 'list' && <ListBar key="list-bar" />}
          {bar === 'media' && <MediaBar key="media-bar" />}
        </React.unstable_AsyncMode>
        <SliderManager key="slider" context={context}>
          {columns.map(column => (
            <Column key={column.mstId} column={column} bar={bar} contextSsr={contextSsr} />
          ))}
        </SliderManager>
        {(bar === 'single' || bar === 'media') && <ShareBar key="share-bar" />}
      </Fragment>
    );
  }
}

export default inject((_stores, { context }) => ({
  columns: context.columns,
  columnsLength: context.columns.length,
  bar: context.options.bar,
}))(Context);

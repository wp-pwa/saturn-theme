import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import fastdom from 'fastdom/';
import fdPromised from 'fastdom/extensions/fastdom-promised';

import { getScrollingElement } from '../../../shared/helpers';

const fastdomPromised = fastdom.extend(fdPromised);

class Anchor extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { scrollAndChangeRoute, hash, selected } = this.props;
    scrollAndChangeRoute({ hash, selected });
  }

  render() {
    const { hash, children, className } = this.props;
    return (
      <a className={className} href={hash} onClick={this.onClick}>
        {children}
      </a>
    );
  }
}

Anchor.propTypes = {
  hash: PropTypes.string.isRequired,
  scrollAndChangeRoute: PropTypes.func.isRequired,
  selected: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
};

Anchor.defaultProps = {
  children: null,
  className: null,
};

const mapDispatchToProps = dispatch => {
  const requestRouteChange = dep('connection', 'actions', 'routeChangeRequested');
  return {
    async scrollAndChangeRoute({ hash, selected }) {
      const scrollingElement = await getScrollingElement();
      const element = window.document.querySelector(hash);
      let top;
      await fastdomPromised.measure(() => {
        top = Math.floor(element.getBoundingClientRect().top);
      });
      dispatch(requestRouteChange({ selected, method: 'push' }));
      await fastdomPromised.mutate(() => {
        scrollingElement.scrollBy({ top, behavior: 'smooth'});
      });
    },
  };
};

export default connect(undefined, mapDispatchToProps)(
  inject(({ connection }, { slide }) => {
    const { selected } = connection.context.columns[slide];
    return {
      selected,
    };
  })(Anchor),
);

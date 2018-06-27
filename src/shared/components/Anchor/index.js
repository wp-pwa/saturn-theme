import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import fastdom from 'fastdom';
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
    const { scrollAndChangeRoute, hash } = this.props;
    scrollAndChangeRoute({ hash });
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
};

Anchor.defaultProps = {
  children: null,
  className: null,
};

export default inject(({ stores: { connection } }, { item }) => ({
  async scrollAndChangeRoute({ hash }) {
    const scrollingElement = await getScrollingElement();
    const element = window.document.querySelector(hash);
    let top;
    let scrollTop;
    await fastdomPromised.measure(() => {
      top = Math.floor(element.getBoundingClientRect().top);
      ({ scrollTop } = scrollingElement);
    });
    connection.routeChangeRequested({ selectedItem: item, method: 'push' });
    await fastdomPromised.mutate(() => {
      if (scrollingElement.scrollBy) scrollingElement.scrollBy({ top, behavior: 'smooth' });
      else scrollingElement.scrollTop = scrollTop + top;
    });
  },
}))(Anchor);

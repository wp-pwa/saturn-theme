/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Spinner from '../Spinner';

class Disqus extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    shortname: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    globalId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    linkColor: PropTypes.string.isRequired,
  };

  constructor() {
    super();

    this.state = {
      loaded: false,
      height: 120,
    };

    this.handleMessage = ({ data }) => {
      if (typeof data !== 'object') return;

      const { scope, height } = data;

      if (scope !== 'disqus' || !height) return;

      this.setState({
        loaded: true,
        height,
      });
    };
  }

  componentWillMount() {
    window.addEventListener('message', this.handleMessage);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  render() {
    const { id, globalId, url, title, shortname, linkColor } = this.props;
    const iframePath = `${window['wp-pwa'].ssr || '/'}dynamic/saturn-app-theme-worona/disqus.html`;

    return (
      <Container height={this.state.height}>
        {!this.state.loaded && (
          <Wrapper>
            <Spinner />
          </Wrapper>
        )}
        <Iframe
          id="disqus"
          height={this.state.height}
          title={title}
          src={`${iframePath}?url=${url}&identifier=${`${id} ${globalId}`}&shortname=${
            shortname
          }&title=${title}&link_color=${linkColor}`}
        />
      </Container>
    );
  }
}

export default inject(({ connection }, { id }) => ({
  url: connection.single.post[id]._link,
  globalId: connection.single.post[id].guid,
  title: connection.single.post[id].title,
  linkColor: 'rgb(70, 70, 70)',
}))(Disqus);

const Container = styled.div`
  height: ${({ height }) => height}px;
  transition: height 150ms ease;
  padding: 0 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: ${({ height }) => height}px;
  margin-top: 15px;
  border: none;
`;

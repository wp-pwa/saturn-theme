import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import Spinner from '../Spinner';
import * as selectorCreators from '../../selectorCreators';

class Disqus extends Component {
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
          src={`https://localhost:3000/static/saturn-app-theme-worona/disqus-iframe.html?url=${url}&identifier=${`${id} ${globalId}`}&shortname=${shortname}&title=${title}&link_color=${linkColor}`}
        />
      </Container>
    );
  }
}

Disqus.propTypes = {
  id: PropTypes.number.isRequired,
  shortname: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  globalId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  linkColor: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  url: selectorCreators.post.getUrl(id)(state),
  globalId: selectorCreators.post.getGlobalId(id)(state),
  title: dep('connection', 'selectors', 'getTitle')(state),
  linkColor: 'rgb(70, 70, 70)',
});

export default connect(mapStateToProps)(Disqus);

const Container = styled.div`
  height: ${({ height }) => height}px;
  transition: height 150ms ease;
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

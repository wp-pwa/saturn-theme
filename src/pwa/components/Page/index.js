import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Spinner from '../../elements/Spinner';
import Content from '../../../shared/components/Content';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ssr: props.ssr,
    };
  }

  render() {
    const { id, title, ready, bar, slide, postBarTransparent, postBarNavOnSsr } = this.props;
    const { ssr } = this.state;

    if (!ready) {
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    }

    const hasNav = postBarNavOnSsr && ssr;

    return (
      <Container bar={bar}>
        {!postBarTransparent && <Placeholder hasNav={hasNav} />}
        <Title dangerouslySetInnerHTML={{ __html: title }} />
        <Content id={id} type="page" slide={slide} />
      </Container>
    );
  }
}

Page.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  ready: PropTypes.bool.isRequired,
  bar: PropTypes.string.isRequired,
  slide: PropTypes.number.isRequired,
  postBarTransparent: PropTypes.bool,
  postBarNavOnSsr: PropTypes.bool,
  ssr: PropTypes.bool.isRequired,
};

Page.defaultProps = {
  title: null,
  postBarTransparent: false,
  postBarNavOnSsr: true,
};

const mapStateToProps = state => {
  const postBar =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postBar')(state) || {};

  return {
    postBarTransparent: postBar.transparent,
    postBarNavOnSsr: postBar.navOnSsr,
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id }) => ({
    id,
    title: connection.single.page[id].title,
    ready: connection.single.page[id].ready,
    bar: connection.context.options.bar,
  })),
)(Page);

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme, hasNav }) =>
    hasNav ? `calc(${theme.heights.bar} + ${theme.heights.navbar} - 1px)` : theme.heights.bar}
  }};
  background: ${({ theme }) => theme.colors.background}
`;

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 0;
`;

const Title = styled.h1`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 20px 15px 0px 15px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.2rem;
`;

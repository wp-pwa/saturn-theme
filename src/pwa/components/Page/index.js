import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Footer from '../Footer';
import Spinner from '../../elements/Spinner';
import Content from '../../elements/Content';

class Page extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    ready: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    title: null,
  };

  // componentWillMount() {
  //   console.log('hi there mounting');
  // }
  //
  // componentDidMount() {
  //   console.log('mounted:', this.props);
  // }
  // shouldComponentUpdate(nextProps) {
  //   console.log('next:', nextProps);
  //   console.log('current:', this.props);
  // }
  // componentWillUpdate() {
  //   console.log('hi there will update');
  // }

  render() {
    const { id, title, ready } = this.props;
    if (!ready) {
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    }

    return (
      <Container>
        <Title dangerouslySetInnerHTML={{ __html: title }} />
        <Content id={id} type="page" />
        <Footer />
      </Container>
    );
  }
}

export default inject(({ connection }, { id }) => ({
  id,
  title: connection.single.page[id].title,
  ready: connection.single.page[id].ready,
}))(Page);

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.postLight};
  color: ${({ theme }) => theme.postDark};
  padding-top: ${({ theme }) => `calc(${theme.titleSize} + ${theme.navbarSize})`};
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

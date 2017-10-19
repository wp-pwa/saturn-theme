import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'styled-components';
import Spinner from '../../elements/Spinner';
import Content from '../../elements/Content';
import * as selectorCreators from '../../selectorCreators';

const Page = ({ id, title, isPageReady }) => {
  if (!isPageReady) {
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
    </Container>
  );
};

Page.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isPageReady: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const id = dep('router', 'selectors', 'getId')(state);
  return {
    id,
    title: selectorCreators.page.getTitle(id)(state),
    isPageReady: dep('connection', 'selectors', 'isCurrentSingleReady')(state),
  };
};

export default connect(mapStateToProps)(Page);

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.postLight};
  color: ${({ theme }) => theme.postDark};
  padding-top: calc(${({ theme }) => theme.titleSize} + ${({ theme }) => theme.navbarSize});
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'styled-components';
import Spinner from '../../elements/Spinner';
import Content from '../../elements/Content';

const Page = ({ id, isPageReady }) => {
  if (!isPageReady) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <Container>
      <Content id={id} type="page" />
    </Container>
  );
};

Page.propTypes = {
  id: PropTypes.number.isRequired,
  isPageReady: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  id: dep('connection', 'selectors', 'getCurrentId')(state),
  isPageReady: dep('connection', 'selectors', 'isCurrentSingleReady')(state)
});

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

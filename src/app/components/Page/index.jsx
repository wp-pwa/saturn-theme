import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectors } from '../../deps';
import Spinner from '../../elements/Spinner';
import Content from '../../elements/Content';

const Page = ({ page, isPageReady }) => {
  if (!isPageReady) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <Container>
      <Content content={page.content.rendered} />
    </Container>
  );
};

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.postLight};
  color: ${({ theme }) => theme.postDark};
  padding-top: calc(${({ theme }) => theme.titleSize} + ${({ theme }) => theme.navbarSize});
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

Page.propTypes = {
  page: PropTypes.shape({}),
  isPageReady: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  page: selectors.getCurrentSingle(state),
  isPageReady: selectors.isCurrentSingleReady(state),
});

export default connect(mapStateToProps)(Page);

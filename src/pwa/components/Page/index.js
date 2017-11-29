import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Spinner from '../../elements/Spinner';
import Content from '../../elements/Content';

const Page = ({ id, title, ready }) => {
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
    </Container>
  );
};

Page.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default inject(({ connection }) => {
  const { id } = connection.selected;
  return {
    id,
    title: connection.single.page[id].title,
    ready: connection.single.page[id].ready,
  };
})(Page);

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

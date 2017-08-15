import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDisqusComments from 'react-disqus-comments';
import CommentsIcon from 'react-icons/lib/fa/comments-o';
import ArrowIcon from 'react-icons/lib/fa/angle-down';
import styled from 'styled-components';
import * as selectors from '../../selectors';
import * as actions from '../../actions';
import * as deps from '../../deps';

const Comments = ({ article, isOpen, toggle, disqusShortname }) =>
  <Container>
    <Button onClick={toggle}>
      <CommentsIconWrapper>
        <CommentsIcon size={40} />
      </CommentsIconWrapper>
      <span>
        {'Comentarios'}
      </span>
      <ArrowIconWrapper isOpen={isOpen}>
        <ArrowIcon size={40} />
      </ArrowIconWrapper>
    </Button>
    <InnerContainer isOpen={isOpen}>
      <ReactDisqusComments
        shortname={disqusShortname}
        identifier={`${article.id} ${article.guid.rendered}`}
        title={article.title.rendered}
        url={article.link}
        onNewComment={() => article}
      />
    </InnerContainer>
  </Container>;

Comments.propTypes = {
  article: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  disqusShortname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isOpen: selectors.comments.isOpen(state),
  article: deps.selectors.getCurrentSingle(state),
});

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(actions.comments.toggle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

const Container = styled.div`padding-top: 10px;`;

const Button = styled.div`
  margin: 0;
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
  background: white !important;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ddd;
  color: #535353;
  outline: none;
`;

const CommentsIconWrapper = styled.div`
  position: relative;
  display: block;
`;

const ArrowIconWrapper = styled.div`
  transition: transform 300ms;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg);'};
`;

const InnerContainer = styled.div`
  border-top: 1px solid #ddd;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? '100%' : 0)};

  & > div {
    padding: 20px;
  }
`;

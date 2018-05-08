import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import CommentsIcon from 'react-icons/lib/fa/comments-o';
import ArrowIcon from 'react-icons/lib/fa/angle-down';
import styled from 'react-emotion';
import universal from 'react-universal-component';
import Spinner from '../../elements/Spinner';
import * as actions from '../../actions';
// This styled component is being imported from its own file
// because it throws some kind of error when defined at the end of this file.
// (This is a lazy comment because I was just passing by and I remembered this
// and I don't know exactly what the problem was back then).
import { SpinnerWrapper } from './styled';

const DynamicDisqus = universal(import('../../elements/Disqus'), {
  loading: (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  ),
});

class Comments extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      wasOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => {
      if (prevState.isOpen) {
        this.props.commentsHaveClosed();
      } else {
        this.props.commentsHaveOpen();
      }

      return { isOpen: !prevState.isOpen, wasOpen: true };
    });
  }

  render() {
    const { id, type, shortname } = this.props;
    const { isOpen, wasOpen } = this.state;

    return shortname ? (
      <Container>
        <Button onClick={this.toggle}>
          <CommentsIconWrapper>
            <CommentsIcon size={40} />
          </CommentsIconWrapper>
          <span>Comentarios</span>
          <ArrowIconWrapper isOpen={isOpen}>
            <ArrowIcon size={40} />
          </ArrowIconWrapper>
        </Button>
        <InnerContainer isOpen={isOpen}>
          {wasOpen && <DynamicDisqus type={type} id={id} shortname={shortname} />}
        </InnerContainer>
      </Container>
    ) : null;
  }
}

Comments.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  commentsHaveOpen: PropTypes.func.isRequired,
  commentsHaveClosed: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  commentsHaveOpen: () => dispatch(actions.comments.haveOpen()),
  commentsHaveClosed: () => dispatch(actions.comments.haveClosed()),
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ settings }) => ({
    shortname: settings.theme.disqus || '',
  })),
)(Comments);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const Button = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: white !important;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? '100%' : 0)};
`;

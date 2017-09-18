import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dynamic from '@worona/next/dynamic';
import { connect } from 'react-redux';
import CommentsIcon from 'react-icons/lib/fa/comments-o';
import ArrowIcon from 'react-icons/lib/fa/angle-down';
import styled from 'styled-components';
import { dep } from 'worona-deps';

const loading = () => null;
const DynamicReactDisqusComments = dynamic(import('react-disqus-comments'), { loading });

class Comments extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      wasOpen: false,
    };
  }

  componentWillUpdate(nextProps) {
    // Close panel when not active.
    if (this.props.active && !nextProps.active && this.state.isOpen) {
      this.toggle();
    }
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen, wasOpen: true }));
  }

  render() {
    const { article, disqusShortname, active } = this.props;
    const { isOpen, wasOpen } = this.state;
    return disqusShortname ? (
      <Container>
        <Button onClick={this.toggle}>
          <CommentsIconWrapper>
            <CommentsIcon size={40} />
          </CommentsIconWrapper>
          <span>{'Comentarios'}</span>
          <ArrowIconWrapper isOpen={isOpen}>
            <ArrowIcon size={40} />
          </ArrowIconWrapper>
        </Button>
        <InnerContainer isOpen={isOpen}>
          {active &&
            wasOpen && (
              <DynamicReactDisqusComments
                shortname={disqusShortname}
                identifier={`${article.id} ${article.guid.rendered}`}
                title={article.title.rendered}
                url={article.link}
                onNewComment={() => article}
              />
            )}
        </InnerContainer>
      </Container>
    ) : null;
  }
}

Comments.propTypes = {
  article: PropTypes.shape({}).isRequired,
  active: PropTypes.bool.isRequired,
  disqusShortname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  article: dep('connection', 'selectors', 'getCurrentSingle')(state),
  disqusShortname: dep('settings', 'selectorCreators', 'getSetting')('theme', 'disqus')(state) || '',
});

export default connect(mapStateToProps)(Comments);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
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
  ${'' /* border-top: 1px solid #ddd; */} overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? '100%' : 0)};

  & > div {
    padding: 20px;
  }
`;

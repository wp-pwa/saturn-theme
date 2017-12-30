import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import CommentsIcon from 'react-icons/lib/fa/comments-o';
import ArrowIcon from 'react-icons/lib/fa/angle-down';
import styled from 'react-emotion';
import universal from 'react-universal-component';

const DynamicDisqus = universal(import('../../elements/Disqus'));

class Comments extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    shortname: PropTypes.string
  };

  static defaultProps = {
    shortname: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      wasOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen, wasOpen: true }));
  }

  render() {
    const { id, shortname, active } = this.props;
    const { isOpen, wasOpen } = this.state;

    return (
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
          {active && wasOpen && <DynamicDisqus id={id} shortname={shortname} />}
        </InnerContainer>
      </Container>
    );
  }
}

export default inject(({ connection }, { id }) => ({
  active: connection.context.column.selected.id === id
}))(Comments);

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

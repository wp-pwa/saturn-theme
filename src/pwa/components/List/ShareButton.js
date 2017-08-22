import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import IconShare from 'react-icons/lib/md/share';
import * as actions from '../../actions';

class ShareButton extends Component {
  constructor() {
    super();

    this.state = {
      touched: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.id !== this.props.id ||
      nextProps.wpType !== this.props.wpType ||
      nextState.touched !== this.state.touched
    );
  }

  toggleTouched() {
    this.setState(
      {
        touched: !this.state.touched,
      },
      () => {
        setTimeout(() => {
          this.setState({
            touched: !this.state.touched,
          });
        }, 150);
      }
    );
  }

  render() {
    const { id, wpType, shareModalOpeningRequested } = this.props;

    return (
      <Container
        touched={this.state.touched}
        onClick={() => {
          this.toggleTouched();
          shareModalOpeningRequested({ id, wpType });
        }}
      >
        <IconShare size={27} />
      </Container>
    );
  }
}

ShareButton.propTypes = {
  id: PropTypes.number.isRequired,
  wpType: PropTypes.string.isRequired,
  shareModalOpeningRequested: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  shareModalOpeningRequested: payload => dispatch(actions.shareModal.openingRequested(payload)),
});

export default connect(null, mapDispatchToProps)(ShareButton);

const touch = keyframes`
  100% {
    background-color: rgba(255, 255, 255, 0.2)
  }
`;

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  color: ${({ theme }) => theme.postListLight};
  height: ${({ theme }) => theme.shareSize};
  width: ${({ theme }) => theme.shareSize};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 30%;

  animation-name: ${({ touched }) => (touched ? touch : '')};
  animation-duration: 80ms;
  animation-timing-function: ease-out;
  animation-iteration-count: 2;
  animation-direction: alternate;
`;

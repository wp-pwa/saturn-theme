import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import IconClose from 'react-icons/lib/md/close';
import * as actions from '../../actions';

class CloseButton extends PureComponent {
  constructor() {
    super();

    this.state = {
      touched: false,
    };
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
    return (
      <Container
        touched={this.state.touched}
        onClick={() => {
          this.toggleTouched();
          this.props.shareModalClosingRequested();
        }}
      >
        <IconClose size={33} />
      </Container>
    );
  }
}

CloseButton.propTypes = {
  shareModalClosingRequested: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  shareModalClosingRequested: () => dispatch(actions.shareModal.closingRequested()),
});

export default connect(null, mapDispatchToProps)(CloseButton);

const touch = keyframes`
  100% {
    background-color: rgba(0, 0, 0, 0.2)
  }
`;

const Container = styled.div`
  width: ${({ theme }) => theme.titleSize};
  height: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;

  animation-name: ${({ touched }) => (touched ? touch : '')};
  animation-duration: 70ms;
  animation-timing-function: ease-out;
  animation-iteration-count: 2;
  animation-direction: alternate;
`;

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
          this.props.menuHasClosed();
        }}
      >
        <IconClose size={33} />
      </Container>
    );
  }
}

CloseButton.propTypes = {
  menuHasClosed: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed()),
});

export default connect(null, mapDispatchToProps)(CloseButton);

const touch = keyframes`
  100% {
    background-color: rgba(255, 255, 255, 0.2)
  }
`;

const Container = styled.div`
  width: ${({ theme }) => theme.titleSize};
  height: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;

  animation-name: ${({ touched }) => (touched ? touch : '')};
  animation-duration: 70ms;
  animation-timing-function: ease-out;
  animation-iteration-count: 2;
  animation-direction: alternate;
`;

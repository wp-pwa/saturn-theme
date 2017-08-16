import React, { Component, PropTypes } from "react";
import Perf from "react-addons-perf";
import styled from "styled-components";

class Performance extends Component {
  constructor() {
    super();
    this.state = { running: false };
  }

  toggleState() {
    this.setState(
      {
        running: !this.state.running
      },
      () => {
        if (this.state.running) {
          Perf.start();
        } else {
          Perf.stop();
          Perf.printWasted();
        }
      }
    );
  }

  render() {
    const { running } = this.state;

    return (
      <Container>
        <button onClick={() => this.toggleState()}>
          {running ? "Stop" : "Start"}
        </button>
      </Container>
    );
  }
}

export default Performance;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 45px;
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
`;

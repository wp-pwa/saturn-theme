import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Spinner from '../../elements/Spinner';
import Slider from '../../elements/Swipe';
// import List from './List';
import * as selectors from '../../selectors';

class Lists extends Component {
  constructor() {
    super();

    this.renderLists = this.renderLists.bind(this);
  }

  renderLists({ id, type }, index) {
    const { activeSlide } = this.props;

    // if (index < activeSlide - 1 || index > activeSlide + 1) return <div key={index} />;
    //
    // if (activeSlide !== index && /entering|exited/.test(status)) return <div key={index} />;
    return <List key={index}>{type + id}</List>
    // return <List key={index} id={id} type={type} active={index === activeSlide} />;
  }

  render() {
    const { isReady, lists, activeSlide, status } = this.props;
    console.log(activeSlide)
    const index = activeSlide >= 0 ? activeSlide : null;

    return isReady ? (
      <Container status={status}>
        <Slider index={index}>{lists.map(this.renderLists)}</Slider>
      </Container>
    ) : (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

Lists.propTypes = {
  isReady: PropTypes.bool.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  status: PropTypes.string.isRequired,
  activeSlide: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  isReady: selectors.list.areListsReady(state),
  lists: selectors.list.getLists(state),
  activeSlide: selectors.list.getActiveSlide(state),
});

export default connect(mapStateToProps)(Lists);

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;
const List = styled.div`
  padding-top: 100px;
`
const Container = styled.div`${({ status }) => (status === 'exiting' ? 'display: none' : '')};`;

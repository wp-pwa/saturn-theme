import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import Spinner from '../../elements/Spinner';
import Slider from '../../elements/Swipe';
import List from './List';
import * as selectors from '../../selectors';

class Lists extends Component {
  constructor() {
    super();

    this.renderLists = this.renderLists.bind(this);
  }

  renderLists({ id, type }, index) {
    const { status, activeSlide, ssr } = this.props;

    if (index < activeSlide - 1 || index > activeSlide + 1) return <div key={index} />;

    if (activeSlide !== index && (ssr || /entering|exited/.test(status)))
      return <div key={index} />;

    return <List key={index} name={`${type}${id || ''}`} active={index === activeSlide} />;
  }

  render() {
    const { isReady, lists, activeSlide, status } = this.props;

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
  ssr: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isReady: selectors.list.areListsReady(state),
  lists: selectors.list.getLists(state),
  activeSlide: selectors.list.getActiveSlide(state),
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

export default connect(mapStateToProps)(Lists);

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;

const Container = styled.div`${({ status }) => (status === 'exiting' ? 'display: none' : '')};`;

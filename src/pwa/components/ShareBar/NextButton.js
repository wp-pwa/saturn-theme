import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import IconNext from 'react-icons/lib/fa/angle-right';
import { dep } from 'worona-deps';
import * as actions from '../../actions';

class NextButton extends Component {
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
    const {
      isListLoading,
      activeSlide,
      sliderLength,
      activePostSlideChangeRequested,
      anotherPostsPageRequested,
    } = this.props;
    return (
      <Container
        touched={this.state.touched}
        onClick={() => {
          this.toggleTouched();

          if (sliderLength && activeSlide + 1 < sliderLength) {
            activePostSlideChangeRequested({
              activeSlide: activeSlide + 1,
              sliderAnimation: 'late',
              sliderLength,
            });
          } else if (!isListLoading) {
            anotherPostsPageRequested();
          }
        }}
      >
        {activeSlide === sliderLength - 1
          ? <NextButtonText>
              {isListLoading ? 'Cargando...' : 'Cargar más'}
            </NextButtonText>
          : <div>
              <NextButtonText>
                {'Siguiente '}
              </NextButtonText>
              <StyledIconNext />
            </div>}
      </Container>
    );
  }
}

NextButton.propTypes = {
  isListLoading: PropTypes.bool.isRequired,
  activeSlide: PropTypes.number.isRequired,
  sliderLength: PropTypes.number.isRequired,
  activePostSlideChangeRequested: PropTypes.func.isRequired,
  anotherPostsPageRequested: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeSlide: state.theme.postSlider.final.activeSlide,
  sliderLength: dep('connection', 'selectorCreators', 'getListResults')('currentList')(state)
    .length,
  isListLoading: dep('connection', 'selectorCreators', 'isListLoading')('currentList')(state),
});

const mapDispatchToProps = dispatch => ({
  activePostSlideChangeRequested: payload =>
    dispatch(actions.postSlider.activePostSlideChangeRequested(payload)),
  anotherPostsPageRequested: () =>
    dispatch(dep('connection', 'actions', 'anotherPostsPageRequested')()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);

const touch = keyframes`
  100% {
    background-color: rgba(0, 0, 0, 0.2)
  }
`;

const Container = styled.div`
  flex: 10 1 auto;
  height: 100%;
  margin: 0;
  padding: 0;
  margin-left: 4px;
  border-radius: 4px;
  background: #bdbdbd;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;

  animation-name: ${({ touched }) => (touched ? touch : '')};
  animation-duration: 70ms;
  animation-timing-function: ease-out;
  animation-iteration-count: 2;
  animation-direction: alternate;
  user-select: none;

  &:focus {
    outline: none;
  }
`;

const NextButtonText = styled.span`
  padding-left: 5px;
  font-size: 0.9em;
  text-transform: uppercase;
`;

const StyledIconNext = styled(IconNext)`
  height: 1em;
  width: 1em;
  padding-bottom: 1px;
  padding-left: 2px;
`;

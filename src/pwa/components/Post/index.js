import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'react-emotion';
import Slider from '../../elements/Swipe';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import Spinner from '../../elements/Spinner';
import PostItem from './PostItem';
import Bar from './Bar';
import ShareBar from '../ShareBar';

class Post extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.renderPostItems = this.renderPostItems.bind(this);
  }

  handleChangeIndex({ index }) {
    const { activeSlideHasChanged, postList } = this.props;
    activeSlideHasChanged({
      id: postList[index],
      wpType: 'post',
    });
  }

  renderPostItems(id, index) {
    const { status, activeSlide } = this.props;

    if (index < activeSlide - 1 || index > activeSlide + 1) return <div key={index} />;

    if (activeSlide !== index && /entering|exited/.test(status)) return <div key={index} />;

    return (
      <PostItem key={id} id={id} active={activeSlide === index} slide={index} status={status} />
    );
  }

  render() {
    const { status, postList, postReady, isListReady, activeSlide } = this.props;
    return postReady && isListReady ? (
      <Container status={status}>
        <Bar />
        <Slider index={activeSlide} onChangeIndex={this.handleChangeIndex}>
          {postList.map(this.renderPostItems)}
        </Slider>
        <ShareBar />
      </Container>
    ) : (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

Post.propTypes = {
  postReady: PropTypes.bool.isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  activeSlide: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  activeSlideHasChanged: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  activeSlideHasChanged: payload => dispatch(actions.postSlider.activeSlideHasChanged(payload)),
});

export default connect(null, mapDispatchToProps)(
  inject(stores => {
    const { id } = stores.connection.selected;
    return {
      postReady: stores.connection.single.post[id].ready,
      postList: [id],
      isListReady: stores.connection.single.post[id].ready,
      activeSlide: 0,
    };
  })(Post),
);

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;

const Container = styled.div`
  ${({ status }) => (status === 'exiting' ? 'display: none' : '')};
  z-index: 60;
`;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'react-emotion';
import Slider from '../../elements/Swipe';
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
    const { routeChangeRequested, postList } = this.props;

    routeChangeRequested({
      selected: {
        singleType: postList[index].singleType,
        singleId: postList[index].singleId,
      },
      method: 'push',
    });
  }

  renderPostItems({ id }, index) {
    if (!id) return <div key={index} />;

    const { status, activeSlide } = this.props;

    if (index < activeSlide - 1 || index > activeSlide + 1) return <div key={index} />;

    if (activeSlide !== index && /entering|exited/.test(status)) return <div key={index} />;

    return (
      <PostItem key={id} id={id} active={activeSlide === index} slide={index} status={status} />
    );
  }

  render() {
    const { status, postList, activeSlide } = this.props;
    return (
      <Container status={status}>
        <Bar />
        <Slider index={activeSlide} onChangeIndex={this.handleChangeIndex}>
          {postList.map(this.renderPostItems)}
        </Slider>
        <ShareBar />
      </Container>
    );
  }
}

Post.propTypes = {
  postList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeSlide: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  routeChangeRequested: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  routeChangeRequested: payload =>
    dispatch(dep('connection', 'actions', 'routeChangeRequested')(payload)),
});

export default connect(null, mapDispatchToProps)(
  inject(({ connection }) => {
    const { id } = connection.selected;
    const postList = connection.context.columns.map(c => c.items[0]);

    return {
      postList,
      activeSlide: postList.findIndex(post => post.singleId === id),
    };
  })(Post),
);

const Container = styled.div`
  ${({ status }) => (status === 'exiting' ? 'display: none' : '')};
  z-index: 60;
`;

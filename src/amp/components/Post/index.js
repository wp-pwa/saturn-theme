import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Media from '../../../shared/components/Media';
import Header from './Header';
import Content from '../../../shared/components/Content';
import TagList from './TagList';
// import SeoWord from '../../elements/SeoWord';
// import Comments from '../Comments';
// import Carousel from '../Carousel';
import * as selectors from '../../../pwa/selectors';

class Post extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    media: PropTypes.number,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    noFeaturedImage: PropTypes.bool
  };

  static defaultProps = {
    media: null,
    noFeaturedImage: false
  };

  constructor() {
    super();

    this.state = {
      currentList: null,
      carouselLists: null
    };

    this.setLists = this.setLists.bind(this);
  }

  // componentWillMount() {
  //   this.setLists();
  // }

  setLists() {
    const carouselLists = this.props.lists.slice(0, 3);
    const currentList = carouselLists.splice(0, 1)[0];

    this.setState({
      currentList,
      carouselLists
    });
  }

  render() {
    const { id, media, noFeaturedImage } = this.props;
    // const { currentList, carouselLists } = this.state;

    return (
      <Container>
        <Placeholder />
        {noFeaturedImage ? null : <Media id={media} height="55vh" width="100vw" />}
        <Header id={id} />
        <Content
          id={id}
          type="post"
          // elementsToInject={[
          //   {
          //     index: 3,
          //     doNotPlaceAtTheEnd: true,
          //     value: (
          //       <Carousel
          //         title="Te puede interesar..."
          //         size="small"
          //         type={currentList.type}
          //         id={currentList.id}
          //         active={active}
          //         params={{ excludeTo: id, limit: 5 }}
          //       />
          //     )
          //   }
          // ]}
        />
        <TagList id={id} />
        {/* <Comments id={id} /> */}
        {/* <Carousel
          title="Siguientes artículos"
          size="small"
          type={currentList.type}
          id={currentList.id}
          active={active}
          params={{ excludeTo: id, limit: 5 }}
        /> */}
        {/* {carouselLists.map(list => (
          <Carousel
            key={list.id}
            title={`Más en ${list.title}`}
            size="medium"
            type={list.type}
            id={list.id}
            active={active}
            params={{ exclude: id, limit: 5 }}
          />
        ))} */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  lists: selectors.list.getLists(state),
  noFeaturedImage: dep('settings', 'selectorCreators', 'getSetting')('theme', 'noFeaturedImage')(
    state
  )
});

export default connect(mapStateToProps)(
  inject(({ connection }) => {
    const { id } = connection.selected;

    return {
      id,
      media: connection.single.post[id] && connection.single.post[id].featured.id
    };
  })(Post)
);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
`;

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.heights.bar};
  background-color: ${({ theme }) => theme.colors.background};
`;

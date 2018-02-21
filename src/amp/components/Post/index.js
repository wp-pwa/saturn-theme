import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Header from '../../../shared/components/Post/Header';
import Author from '../../../shared/components/Post/Author';
import Fecha from '../../../shared/components/Post/Fecha';
import Content from '../../../shared/components/Content';
import TagList from './TagList';
// import SeoWord from '../../elements/SeoWord';
// import Comments from '../Comments';
// import Carousel from '../Carousel';
import * as selectors from '../../../pwa/selectors';

class Post extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    postAuthorPosition: PropTypes.string,
    postFechaPosition: PropTypes.string,
  };

  static defaultProps = {
    postAuthorPosition: 'header',
    postFechaPosition: 'header',
  };

  constructor() {
    super();

    this.state = {
      currentList: null,
      carouselLists: null,
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
      carouselLists,
    });
  }

  render() {
    const { id, postAuthorPosition, postFechaPosition } = this.props;
    // const { currentList, carouselLists } = this.state;

    return (
      <Container>
        <Placeholder />
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
        {(postAuthorPosition === 'footer' || postFechaPosition === 'footer') && (
          <InnerContainer>
            {postAuthorPosition === 'footer' && <Author id={id} />}
            {postFechaPosition === 'footer' && <Fecha id={id} />}
          </InnerContainer>
        )}
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

const mapStateToProps = state => {
  const postAuthor =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postAuthor')(state) || {};
  const postFecha =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postFecha')(state) || {};

  return {
    lists: selectors.list.getLists(state),
    postAuthorPosition: postAuthor.position,
    postFechaPosition: postFecha.position,
  };
};

export default connect(mapStateToProps)(
  inject(({ connection }) => ({
    id: connection.selected.id,
  }))(Post),
);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 20px;
`;

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme }) => `calc(${theme.heights.bar} + ${theme.heights.navbar} - 1px)`};
  background-color: ${({ theme }) => theme.colors.background};
`;

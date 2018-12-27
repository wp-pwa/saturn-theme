import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import Lazy from '../../../shared/components/LazyAnimated';
import Content from '../../../shared/components/Content';
import Author from '../../../shared/components/Post/Author';
import Fecha from '../../../shared/components/Post/Fecha';
import TagList from './TagList';
import Comments from '../Comments';
import Carousel from '../Carousel';
import Spinner from '../../../shared/components/Spinner';
import SlotInjector from '../../../shared/components/SlotInjector';

const containerProps = {
  animate: Lazy.onMount,
  offsetVertical: 2000,
  offsetHorizontal: 50,
  debounce: true,
  throttle: 100,
};

class Body extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    columnId: PropTypes.string.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    postAuthorPosition: PropTypes.string,
    postFechaPosition: PropTypes.string,
    item: PropTypes.shape({}).isRequired,
    interestedPostsText: PropTypes.string.isRequired,
    nextPostsText: PropTypes.string.isRequired,
    moreInCategoryText: PropTypes.string.isRequired,
  };

  static defaultProps = {
    postAuthorPosition: 'header',
    postFechaPosition: 'header',
  };

  constructor(props) {
    super(props);

    const {
      type,
      id,
      item: { fromList },
      interestedPostsText,
    } = props;

    if (props.lists.length) {
      let index = props.lists.findIndex(
        item => item.type === fromList.type && item.id === fromList.id,
      );

      if (index < 0) index = 0;

      const extendedLists = props.lists.concat(props.lists.slice(0, 2));
      const carouselLists = extendedLists.slice(index, index + 3);
      const currentList = carouselLists.splice(0, 1)[0];

      const currentListCarouselProps = {
        listType: currentList.type,
        listId: currentList.id,
        itemType: type,
        itemId: id,
        excludeTo: id,
        limit: 5,
      };

      const elementsToInject = [
        {
          position: 3,
          doNotPlaceAtTheEnd: true,
          element: (
            <Carousel
              key={`carousel-${currentList.type}-${currentList.id}`}
              title={interestedPostsText}
              {...currentListCarouselProps}
            />
          ),
        },
      ];

      this.state = {
        currentListCarouselProps,
        elementsToInject,
        carouselLists,
      };
    } else {
      this.state = {
        currentListCarouselProps: null,
        elementsToInject: [],
        carouselLists: [],
      };
    }
  }

  render() {
    const {
      type,
      id,
      columnId,
      postAuthorPosition,
      postFechaPosition,
      nextPostsText,
      moreInCategoryText,
      item,
    } = this.props;
    const {
      currentListCarouselProps,
      elementsToInject,
      carouselLists,
    } = this.state;

    return (
      <Container
        {...containerProps}
        placeholder={
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
      >
        <Content
          id={id}
          type={type}
          mstId={columnId}
          elementsToInject={elementsToInject}
        />
        {postAuthorPosition === 'footer' || postFechaPosition === 'footer' ? (
          <InnerContainer>
            {postAuthorPosition === 'footer' && <Author type={type} id={id} />}
            {postFechaPosition === 'footer' && <Fecha type={type} id={id} />}
          </InnerContainer>
        ) : null}
        <TagList type={type} id={id} />
        <Comments type={type} id={id} />
        <SlotInjector position="after comments" item={item} />
        <div>
          {currentListCarouselProps && (
            <Carousel title={nextPostsText} {...currentListCarouselProps} />
          )}
          <SlotInjector position="after next posts" item={item} />
          {carouselLists &&
            carouselLists.map((list, i) => (
              <Fragment>
                <Carousel
                  key={list.id}
                  title={moreInCategoryText.replace('#category#', list.title)}
                  listType={list.type}
                  listId={list.id}
                  itemType={type}
                  itemId={id}
                  exclude={id}
                  limit={5}
                />
                {!i && <SlotInjector position="after more in 1" item={item} />}
              </Fragment>
            ))}
        </div>
      </Container>
    );
  }
}

export default inject(
  ({ stores: { connection, settings, theme } }, { type, id }) => {
    const postAuthor = settings.theme.postAuthor || {};
    const postFecha = settings.theme.postFecha || {};
    const item = connection.selectedContext.getItem({ item: { type, id } });

    return {
      item,
      postAuthorPosition: postAuthor.position,
      postFechaPosition: postFecha.position,
      lists: theme.listsFromMenu,
      interestedPostsText: theme.lang.get('interestedPosts'),
      nextPostsText: theme.lang.get('nextPosts'),
      moreInCategoryText: theme.lang.get('moreInCategory'),
    };
  },
)(Body);

const Container = styled(Lazy)`
  position: relative;
  flex: 1;
  display: flex;
  width: 100vw;
  overflow: hidden;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 20px;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
`;

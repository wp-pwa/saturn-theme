import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { Slot, Fill } from 'react-slot-fill';
import { dep } from 'worona-deps';
import Lazy from '../../elements/LazyAnimated';
import Content from '../../../shared/components/Content';
import Author from '../../../shared/components/Post/Author';
import Fecha from '../../../shared/components/Post/Fecha';
import TagList from './TagList';
import Comments from '../Comments';
import Carousel from '../Carousel';
import Spinner from '../../elements/Spinner';
import * as selectors from '../../selectors';

const containerProps = {
  animate: Lazy.onMount,
  offsetVertical: 2000,
  offsetHorizontal: 50,
  debounce: true,
  throttle: 100,
};

class Body extends Component {
  static propTypes = {
    mstId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    columnId: PropTypes.string.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    postAuthorPosition: PropTypes.string,
    postFechaPosition: PropTypes.string,
    fromList: PropTypes.shape({}).isRequired,
    isSelected: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    postAuthorPosition: 'header',
    postFechaPosition: 'header',
  };

  constructor(props) {
    super(props);

    const { mstId, type, id, fromList, columnId } = props;
    let index = props.lists.findIndex(
      item => item.type === fromList.type && item.id === fromList.id,
    );

    if (index < 0) index = 0;

    const extendedLists = props.lists.concat(props.lists.slice(0, 2));
    const carouselLists = extendedLists.slice(index, index + 3);
    const currentList = carouselLists.splice(0, 1)[0];

    const currentListCarouselProps = {
      size: 'small',
      listType: currentList.type,
      listId: currentList.id,
      itemType: type,
      itemId: id,
      excludeTo: id,
      limit: 5,
    };

    const contentCarousel = [
      {
        position: 1,
        doNotPlaceAtTheEnd: true,
        slot: <Slot key={`${mstId}_${columnId}_carousel`} name={`${mstId}_${columnId}_carousel`} />,
      },
    ];

    this.state = {
      currentListCarouselProps,
      contentCarousel,
      carouselLists,
    };

    this.contentCarouselFill = (
      <Fill name={`${mstId}_${columnId}_carousel`}>
        <Carousel title="Te puede interesar..." {...currentListCarouselProps} />
      </Fill>
    );
  }

  render() {
    const {
      mstId,
      type,
      id,
      columnId,
      postAuthorPosition,
      postFechaPosition,
      isSelected,
    } = this.props;
    const { currentListCarouselProps, contentCarousel, carouselLists } = this.state;

    console.log();
    return (
      <Container
        {...containerProps}
        async={!isSelected}
        placeholder={
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
      >
        <Content id={id} type={type} mstId={columnId} elementsToInject={contentCarousel} />
        {this.contentCarouselFill}
        {postAuthorPosition === 'footer' || postFechaPosition === 'footer' ? (
          <InnerContainer>
            {postAuthorPosition === 'footer' && <Author type={type} id={id} />}
            {postFechaPosition === 'footer' && <Fecha type={type} id={id} />}
          </InnerContainer>
        ) : null}
        <TagList id={id} />
        <Comments type={type} id={id} />
        <Carousel title="Siguientes artículos" {...currentListCarouselProps} />
        {carouselLists.map(list => (
          <Carousel
            key={list.id}
            title={`Más en ${list.title}`}
            size="medium"
            listType={list.type}
            listId={list.id}
            itemType={type}
            itemId={id}
            exclude={id}
            limit={5}
          />
        ))}
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

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { type, id }) => ({
    mstId: connection.selectedContext.getItem({ item: { type, id } }).mstId,
    fromList: connection.selectedContext.getItem({ item: { type, id } }).fromList,
    isSelected: connection.selectedContext.getItem({ item: { type, id } }).isSelected,
  })),
)(Body);

const Container = styled(Lazy)`
  position: relative;
  flex: 1;
  display: flex;
  width: 100vw;
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

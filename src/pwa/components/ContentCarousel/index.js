import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Carousel from '../Carousel';

class ContentCarousel extends Component {
  static propTypes = {
    item: PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    fromList: PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    interestedPostsText: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    const { item, fromList, lists } = props;

    const index = Math.max(
      lists.findIndex(
        ({ type, id }) => type === fromList.type && id === fromList.id,
      ),
      0,
    );

    this.state = {
      carouselProps: lists[index]
        ? {
            listType: lists[index].type,
            listId: lists[index].id,
            itemType: item.type,
            itemId: item.id,
            excludeTo: item.id,
            limit: 5,
          }
        : null,
    };
  }

  render() {
    const { interestedPostsText } = this.props;
    const { carouselProps } = this.state;
    return carouselProps ? (
      <Carousel title={interestedPostsText} {...carouselProps} />
    ) : null;
  }
}

export default inject(({ stores: { connection, theme } }, { item }) => ({
  fromList: connection.selectedContext.getItem({ item }),
  lists: theme.listsFromMenu,
  interestedPostsText: theme.lang.get('interestedPosts'),
}))(ContentCarousel);

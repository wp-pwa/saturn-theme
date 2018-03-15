import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Slot } from 'react-slot-fill';
import ListItem from './ListItem';
import ListItemFirst from './ListItemFirst';
import ListItemAlt from './ListItemAlt';
import LoadMore from './LoadMore';
import Ad from '../../../shared/components/Ad';
import Spinner from '../../elements/Spinner';
import * as selectorCreators from '../../selectorCreators';

class List extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
    extract: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    active: PropTypes.bool.isRequired,
    adsOptions: PropTypes.shape({}),
    adsContentFormats: PropTypes.arrayOf(PropTypes.shape({})),
    listContext: PropTypes.shape({}).isRequired,
    slots: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    extract: false,
    adsOptions: null,
    adsContentFormats: [],
    slots: [],
  };

  constructor() {
    super();

    this.renderListItems = this.renderListItems.bind(this);
  }

  renderListItems(post, index) {
    const { type, id } = this.props;
    const { adsOptions, adsContentFormats, listContext } = this.props;
    const { id: postId, title, featured, excerpt, content } = post;
    const selected = { singleId: postId, singleType: 'post' };
    let ListItemType;

    if (!index) ListItemType = ListItemFirst;
    else if (index % 3 === 0) ListItemType = ListItemAlt;
    else ListItemType = ListItem;

    let adConfig = null;

    if (adsOptions && adsContentFormats.length > 0) {
      const { firstAdPosition, postsBeforeAd } = adsOptions;

      const currentIndex = index - firstAdPosition;
      const validIndex = currentIndex >= 0 && currentIndex % postsBeforeAd === 0;

      if (validIndex) {
        adConfig = adsContentFormats[Math.floor((index - firstAdPosition) / postsBeforeAd)];
      }
    }

    return [
      adConfig && <Ad key="ad" {...adConfig} item={{ type, id }} />,
      <ListItemType
        key={postId}
        id={postId}
        title={title}
        media={featured && featured.id}
        excerpt={excerpt || content}
        selected={selected}
        context={listContext}
      />,
    ];
  }

  render() {
    const { id, type, extract, ready, list, active, slots } = this.props;

    // Render posts and ads
    const items = list.map(this.renderListItems);

    // Injects the slots in their positions
    // (from last to first, slots come ordered backwards from props).
    slots.forEach(({ position, names, className }) => {
      if (position <= items.length) {
        // creates a Slot component for each name in the slot
        const slotsToFill = names.map(name => (
          <Slot key={name} name={name} className={className} />
        ));
        // places the Slot components created in their positions
        items.splice(position, 0, ...slotsToFill);
      }
    });

    return ready && !extract ? (
      <Container>
        {items}
        {active && <LoadMore id={id} type={type} />}
      </Container>
    ) : (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

const mapStateToProps = (state, { type, id }) => ({
  adsOptions: selectorCreators.ads.getOptions(type)(state),
  adsContentFormats: selectorCreators.ads.getContentFormats(type)(state),
  slots: selectorCreators.slots.getSlotsSortedReverse(type, id)(state),
});

export default connect(mapStateToProps)(
  inject(({ connection }, { type, id }) => ({
    ready: connection.list[type][id].ready,
    list: connection.list[type][id].entities,
    listContext: {
      items: connection.list[type][id].page.map((e, k) => ({
        listId: id,
        listType: type,
        page: k + 1,
        extract: true,
      })),
      options: {
        bar: 'single',
      },
    },
  }))(List),
);

const Container = styled.div`
  box-sizing: border-box;
  z-index: -1;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    text-decoration: none;
    color: inherit;
    margin: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SpinnerContainer = styled.div`
  height: calc(100vh - ${({ theme }) => `${theme.heights.bar} - ${theme.heights.navbar}`});
  display: flex;
  justify-content: center;
  align-items: center;
`;

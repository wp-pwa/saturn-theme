import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import Slot from '../../../shared/components/LazySlot';
import ListItem from './ListItem';
import ListItemFirst from './ListItemFirst';
import ListItemAlt from './ListItemAlt';
import LoadMore from './LoadMore';
import Ad from '../../../shared/components/Ad';
import Spinner from '../../elements/Spinner';
import * as selectorCreators from '../../selectorCreators';
import { single } from '../../contexts';

class List extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    page: PropTypes.number,
    ready: PropTypes.bool.isRequired,
    extract: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    active: PropTypes.bool.isRequired,
    adsOptions: PropTypes.shape({}),
    adsContentFormats: PropTypes.arrayOf(PropTypes.shape({})),
    context: PropTypes.shape({}).isRequired,
    slots: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    page: null,
    extract: null,
    adsOptions: null,
    adsContentFormats: [],
    slots: [],
  };

  constructor() {
    super();

    this.renderListItems = this.renderListItems.bind(this);
  }

  renderListItems(entity, index) {
    const { type, id, page, adsOptions, adsContentFormats, context } = this.props;
    const { mstId, title, featured, excerpt, content } = entity;
    const item = { type: 'post', id: entity.id, fromList: { type, id, page } };

    let ListItemType;

    if (!index) ListItemType = ListItemFirst;
    else if (index % 3 === 0) ListItemType = ListItemAlt;
    else ListItemType = ListItem;

    let adConfig = null;

    if (adsOptions && adsContentFormats.length) {
      const { firstAdPosition, postsBeforeAd } = adsOptions;

      const currentIndex = index - firstAdPosition;
      const validIndex = currentIndex >= 0 && currentIndex % postsBeforeAd === 0;

      if (validIndex) {
        adConfig = adsContentFormats[Math.floor((index - firstAdPosition) / postsBeforeAd)];
      }
    }

    return [
      adConfig && <Ad key="ad" {...adConfig} item={{ type: this.props.type, id: this.props.id }} />,
      <ListItemType
        key={mstId}
        id={entity.id}
        title={title}
        media={featured.id}
        excerpt={excerpt || content}
        item={item}
        context={context}
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
          <Slot key={name} name={name} className={className} type={type} id={id} />
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

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { type, id, page }) => ({
    ready: connection.list(type, id).ready,
    list: connection.list(type, id).entities,
    context: single([{ type, id, page, extract: 'horizontal' }]),
  })),
)(List);

const Container = styled.div`
  box-sizing: border-box;
  z-index: -1;
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

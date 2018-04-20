import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import Slot from '../../../shared/components/LazySlot';
import ListItem from './ListItem';
import ListItemFirst from './ListItemFirst';
import ListItemAlt from './ListItemAlt';
import Ad from '../../../shared/components/Ad';
import Spinner from '../../elements/Spinner';
import * as selectorCreators from '../../selectorCreators';
import { single } from '../../contexts';
import Lazy from '../../elements/LazyAnimated';
import SameHeight from '../../elements/SameHeight';

class List extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    page: PropTypes.number,
    mstId: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    list: MobxPropTypes.observableArray.isRequired,
    adsOptions: PropTypes.shape({}),
    adsContentFormats: PropTypes.arrayOf(PropTypes.shape({})),
    context: PropTypes.shape({}).isRequired,
    slots: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    page: null,
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
    const item = { type: entity.type, id: entity.id, fromList: { type, id, page } };

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

    return (
      <Fragment key={mstId}>
        {adConfig && <Ad {...adConfig} item={{ type: this.props.type, id: this.props.id }} />}
        <ListItemType
          type={entity.type}
          id={entity.id}
          title={title}
          media={featured.id}
          excerpt={excerpt || content}
          item={item}
          context={context}
        />
      </Fragment>
    );
  }

  render() {
    const { id, type, ready, isSelected, list, slots, mstId } = this.props;

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

    console.log(items);

    return ready ? (
      <Container>
        {items.slice(0,4)}
        <SameHeight id={mstId}>
          <Lazy
            async={!isSelected}
            offsetVertical={1000}
            offsetHorizontal={50}
            throttle={100}
            placeholder={
              <ListSpinnerContainer>
                <Spinner />
              </ListSpinnerContainer>
            }
          >
            {items.slice(4)}
          </Lazy>
        </SameHeight>
      </Container>
    ) : (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

const mapStateToProps = (state, { type }) => ({
  adsOptions: selectorCreators.ads.getOptions(type)(state),
  adsContentFormats: selectorCreators.ads.getContentFormats(type)(state),
  slots: selectorCreators.slots.getSlotsSortedReverse(type, state),
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { type, id, page }) => ({
    ready: connection.list(type, id).ready,
    list: connection.list(type, id).page(page).entities,
    context: single([{ type, id, page, extract: 'horizontal' }]),
    isSelected: connection.selectedContext.getItem({ item: { type, id, page }}).isSelected,
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

const ListSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100px;
`;

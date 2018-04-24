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
import Spinner from '../../elements/Spinner';
import * as selectorCreators from '../../selectorCreators';
import { single } from '../../contexts';

class List extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    page: PropTypes.number,
    mstId: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
    list: MobxPropTypes.observableArray.isRequired,
    context: PropTypes.shape({}).isRequired,
    slots: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    page: null,
    slots: [],
  };

  constructor(props) {
    super(props);

    const { type, id, page, mstId } = props;
    this.item = { type, id, page, mstId };

    this.renderListItems = this.renderListItems.bind(this);
  }

  renderListItems(entity, index) {
    const { type, id, page, context } = this.props;
    const { title, featured, excerpt, content } = entity;
    const item = { type: entity.type, id: entity.id, fromList: { type, id, page } };

    let ListItemType;

    if (!index) ListItemType = ListItemFirst;
    else if (index % 3 === 0) ListItemType = ListItemAlt;
    else ListItemType = ListItem;

    return (
      <Fragment key={entity.mstId}>
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
    const { ready, list, slots } = this.props;
    const { item } = this;

    // Render posts and ads
    const items = list.map(this.renderListItems);

    // Injects the slots in their positions
    // (from last to first, slots come ordered backwards from props).
    slots.forEach(({ position, names, className }) => {
      if (position <= items.length) {
        // creates a Slot component for each name in the slot
        const slotsToFill = names.map(name => (
          <Slot key={name} name={name} className={className} fillChildProps={{ item }} />
        ));
        // places the Slot components created in their positions
        items.splice(position, 0, ...slotsToFill);
      }
    });

    return ready ? (
      <Container>{items}</Container>
    ) : (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

const mapStateToProps = (state, { type }) => ({
  slots: selectorCreators.slots.getSlotsSortedReverse(type, state),
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { type, id, page }) => ({
    ready: connection.list(type, id).ready,
    list: connection.list(type, id).page(page).entities,
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

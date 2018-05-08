import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Slot } from 'react-slot-fill';
import * as selectorCreators from '../../../pwa/selectorCreators';

const SlotInjector = ({ slots, children, ...fillChildProps }) => {
  // If children is a function
  if (typeof children === 'function') {
    return children(
      slots.map(({ position, names, className }) => ({
        position,
        slot: names.map(name => (
          <Slot
            key={`${position}_${name}`}
            name={name}
            className={className}
            fillChildProps={fillChildProps}
          />
        )),
      })),
    );
  }
  // If children is an array of elements or a single element
  const withInjects = children instanceof Array ? [...children] : [children];

  slots.forEach(({ position, names, className }) => {
    if (position <= withInjects.length) {
      // creates a Slot component for each name in the slot
      const slotsToFill = names.map(name => (
        <Slot
          key={`${position}_${name}`}
          name={name}
          className={className}
          fillChildProps={fillChildProps}
        />
      ));
      // places the Slot components created in their positions
      withInjects.splice(position, 0, ...slotsToFill);
    }
  });
  return <Fragment>{withInjects}</Fragment>;
};

SlotInjector.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.shape({}))])
    .isRequired,
  item: PropTypes.shape({}),
  column: PropTypes.shape({}),
  active: PropTypes.bool,
};

SlotInjector.defaultProps = {
  item: {},
  column: {},
  active: undefined,
};

const emptyArray = [];

const mapStateToProps = (state, { item, column }) => {
  if (item) {
    const { type, id, page } = item;
    return { slots: selectorCreators.slots.getSlotsForItem(type, id, page, state) };
  }

  if (column) {
    const { type, index } = column;
    return { slots: selectorCreators.slots.getSlotsForColumn(type, index, state) };
  }

  return { slots: emptyArray };
};

export default connect(mapStateToProps)(SlotInjector);

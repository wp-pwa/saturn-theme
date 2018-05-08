import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Slot } from 'react-slot-fill';

const SlotInjector = ({ slots, children, ...fillChildProps }) => {
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
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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

export default inject(({ theme }, { item, column }) => {
  if (item) {
    const { type, id, page } = item;
    return { slots: theme.getSlotsForItem({ type, id, page }) };
  }

  if (column) {
    const { type, index } = column;
    return { slots: theme.getSlotsForColumn({ type, index }) };
  }

  return { slots: emptyArray };
})(SlotInjector);

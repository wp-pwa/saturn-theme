import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { isMatch } from 'lodash';
import { Slot } from 'react-slot-fill';

// ...rest as prop?
const SlotInjector = ({ slots, position, item }) =>
  slots
    .filter(
      slot =>
        slot.position === position && slot.items.some(i => isMatch(i, item)),
    )
    // keep in mind fillChildProps={fillChildProps}
    .map(({ names }) => names.map(name => <Slot key={name} name={name} />));

export default inject(({ stores: { settings } }) => ({
  slots: settings.theme.slots || [],
}))(SlotInjector);

SlotInjector.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    page: PropTypes.number,
  }),
};

SlotInjector.defaultProps = {
  item: {},
};

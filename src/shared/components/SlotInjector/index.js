import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { isMatch } from 'lodash';
import { Slot } from 'react-slot-fill';
import styled from 'react-emotion';

const SlotInjector = ({ slots, position, item, debug, ...fillChildProps }) => (
  <Fragment>
    {debug ? (
      <SlotMock>
        {position}
        {': '}
        <Span>
          {slots
            .filter(
              slot =>
                slot.position === position &&
                slot.items.some(i => isMatch(item, i)),
            )
            // keep in mind fillChildProps={fillChildProps}
            .map(({ names }) => names.join(', '))
            .join(', ')}
        </Span>
      </SlotMock>
    ) : (
      slots
        .filter(
          slot =>
            slot.position === position &&
            slot.rules &&
            slot.rules.item &&
            slot.rules.item.some(i => isMatch(item, i)),
        )
        .map(({ names }) =>
          names.map(name => (
            <Slot
              key={name}
              name={name}
              fillChildProps={{ item, ...fillChildProps }}
            />
          )),
        )
    )}
  </Fragment>
);

export default inject(({ stores: { settings } }) => ({
  slots: settings.theme.slots || [],
}))(SlotInjector);

SlotInjector.propTypes = {
  debug: PropTypes.bool,
  slots: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  position: PropTypes.string.isRequired,
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    page: PropTypes.number,
  }),
};

SlotInjector.defaultProps = {
  debug: false,
  item: {},
};

const SlotMock = styled.div`
  font-size: 20px;
  background: blue;
  color: yellow;
`;

const Span = styled.span`
  font-weight: bold;
  color: white;
`;

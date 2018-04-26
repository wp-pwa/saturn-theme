import { isMatch } from 'lodash';
import { getSlots } from '../selectors/slots';

const reverseOrder = array => array.sort((a, b) => b.position - a.position);

export const getSlotsForItem = (type, id, page, state) =>
  reverseOrder(
    getSlots(state).filter(
      ({ rules }) => !!rules.item && rules.item.some(rule => isMatch({ type, id, page }, rule)),
    ),
  );

export const getSlotsForColumn = (type, index, state) =>
  reverseOrder(
    getSlots(state).filter(
      ({ rules }) => !!rules.column && rules.column.some(rule => isMatch({ type, index }, rule)),
    ),
  );

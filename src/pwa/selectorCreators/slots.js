import { slots as selectors } from '../selectors'

export const getSlots = type => state => {
  const slots = selectors.getAllSlots(state);
  return slots ? slots.filter(slot => slot.types.includes(type)) : [];
}

export const getSlotsSorted = type => state =>
  getSlots(type)(state).sort((a, b) => a.position - b.position);

export const getSlotsSortedReverse = type => state =>
  getSlots(type)(state).sort((a, b) => b.position - a.position);

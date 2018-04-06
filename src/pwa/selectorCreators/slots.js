import { dep } from 'worona-deps';
import { memoize } from 'lodash';

export const getSlots = memoize((type, state) => {
  const slots = dep('settings', 'selectorCreators', 'getSetting')('theme', 'slots')(state);

  return slots ? slots.filter(slot => slot.types.includes(type)) : [];
});

export const getSlotsSorted = memoize((type, state) =>
  getSlots(type, state).sort((a, b) => a.position - b.position),
);

export const getSlotsSortedReverse = memoize((type, state) =>
  getSlots(type, state).sort((a, b) => b.position - a.position),
);

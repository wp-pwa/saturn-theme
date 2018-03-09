// Different slots for mobile and tablet
const slots = [
  {
    position: 0,
    types: ['latest', 'tag'],
    names: ['iframe1'],
  },
  {
    position: 12,
    types: ['latest'], // or types, and ids, etc.
    names: ['iframe4'],
  },
  {
    position: 2,
    types: ['latest', 'category'], // or types, and ids, etc.
    names: ['iframe2', 'iframe3'],
  },
];

export const getSlots = type => state =>
  slots ? slots.filter(slot => slot.types.includes(type)) : [];

export const getSlotsSorted = type => state =>
  getSlots(type)(state).sort((a, b) => a.position - b.position);

export const getSlotsSortedReverse = type => state =>
  getSlots(type)(state).sort((a, b) => b.position - a.position);

// Different slots for mobile and tablet
const slots = [
  {
    type: 'latest', // or types, and ids, etc.
    position: 12,
    names: ['iframe4'],
  },
  {
    type: 'latest', // or types, and ids, etc.
    position: 2,
    names: ['iframe2', 'iframe3'],
  },
  {
    type: 'latest',
    position: 0,
    names: ['iframe1'],
  },
];

export const getSlots = type => state => (slots ? slots.filter(slot => slot.type === type) : []);

export const getSlotsSorted = type => state =>
  getSlots(type)(state).sort((a, b) => a.position - b.position);

export const getSlotsSortedReverse = type => state =>
  getSlots(type)(state).sort((a, b) => b.position - a.position);

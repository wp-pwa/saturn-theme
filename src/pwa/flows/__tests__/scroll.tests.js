import { types } from 'mobx-state-tree';
import { initializeScrollListener } from '../scroll';

describe('Theme › Flows › PWA › Client › Scroll', () => {
  const fastdomPromised = jest.fn();
  const addEventListener = jest.fn();

  const self = types
    .model('Scroll')
    .actions(() => ({ hideBar: jest.fn(), showBar: jest.fn() }))
    .create({}, { theme: { fastdomPromised, addEventListener } });

  test('Listener is initialized', () => {
    initializeScrollListener(self);

    expect(addEventListener).toHaveBeenCalled();
  });
});

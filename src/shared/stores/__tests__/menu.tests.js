import menu from '../menu';

describe('Theme › Shared › Stores › Menu', () => {
  test('store has isOpen prop', () => {
    const self = menu.create();

    expect(self.isOpen).toBe(false);
  });

  test('open() changes value of isOpen to true', () => {
    const self = menu.create();

    Object.defineProperty(self, 'open', {
      writable: true,
      value: jest.fn(self.open),
    });

    expect(self.isOpen).toBe(false);

    self.open();

    expect(self.open).toHaveBeenCalled();
    expect(self.isOpen).toBe(true);
  });

  test('close() changes value of isOpen to false', () => {
    const self = menu.create({ isOpen: true });

    Object.defineProperty(self, 'close', {
      writable: true,
      value: jest.fn(self.close),
    });

    expect(self.isOpen).toBe(true);

    self.close();

    expect(self.close).toHaveBeenCalled();
    expect(self.isOpen).toBe(false);
  });
});

import base from '../index';
import shareModal from '../shareModal';

describe('Theme › Shared › Stores › ShareModal', () => {
  test('Has `isOpen`, `isLinkCopied` and `item` props', () => {
    const self = shareModal.create();

    expect(self.isOpen).not.toBe(undefined);
    expect(self.isLinkCopied).not.toBe(undefined);
    expect(self.item).not.toBe(undefined);
    expect(self).toMatchSnapshot();
  });

  test('open() changes value of isOpen to true', () => {
    const self = base.create();
    const type = 'post';
    const id = 1;

    Object.defineProperty(self.shareModal, 'open', {
      writable: true,
      value: jest.fn(self.shareModal.open),
    });

    Object.defineProperty(self, 'share', {
      writable: true,
      value: {
        all: {
          requestCount: jest.fn(),
        },
      },
    });

    expect(self.shareModal.isOpen).toBe(false);

    self.shareModal.open({ type, id });

    expect(self.shareModal.isOpen).toBe(true);
    expect(self).toMatchSnapshot();
  });

  test('open() changes item values', () => {
    const self = base.create();
    const type = 'post';
    const id = 1;

    Object.defineProperty(self.shareModal, 'open', {
      writable: true,
      value: jest.fn(self.shareModal.open),
    });

    Object.defineProperty(self, 'share', {
      writable: true,
      value: {
        all: {
          requestCount: jest.fn(),
        },
      },
    });

    expect(self.shareModal.item).toEqual({ type: null, id: null });

    self.shareModal.open({ type, id });

    expect(self.shareModal.item).toEqual({ type: 'post', id: 1 });
    expect(self).toMatchSnapshot();
  });

  test('open() calls share.all.requestCount() with the right values', () => {
    const self = base.create();
    const type = 'post';
    const id = 1;

    Object.defineProperty(self.shareModal, 'open', {
      writable: true,
      value: jest.fn(self.shareModal.open),
    });

    Object.defineProperty(self, 'share', {
      writable: true,
      value: {
        all: {
          requestCount: jest.fn(),
        },
      },
    });

    self.shareModal.open({ type, id });

    expect(self.share.all.requestCount).toHaveBeenCalledWith({
      type: 'post',
      id: 1,
    });
  });

  test('close() changes value of isOpen to false', () => {
    const self = shareModal.create({ isOpen: true });

    Object.defineProperty(self, 'close', {
      writable: true,
      value: jest.fn(self.close),
    });

    expect(self.isOpen).toBe(true);

    self.close();

    expect(self.isOpen).toBe(false);
  });

  test('setLinkCopied() changes the value of isLinkCopied to true, and after one second to false', async () => {
    const delay = jest.fn(() => Promise.resolve());
    const self = shareModal.create(
      {},
      {
        theme: {
          delay,
        },
      },
    );

    Object.defineProperty(self, 'setLinkCopied', {
      writable: true,
      value: jest.fn(self.setLinkCopied),
    });

    expect(self.isLinkCopied).toBe(false);

    const promise = self.setLinkCopied();

    expect(self.isLinkCopied).toBe(true);

    await promise;

    expect(delay).toHaveBeenCalledWith(1000);
    expect(self.isLinkCopied).toBe(false);
  });
});

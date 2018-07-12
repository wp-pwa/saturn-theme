import base from '../index';
import comments from '../comments';

describe('Theme › Shared › Stores › Comments', () => {
  test('Initial snapshot has not changed', () => {
    const self = comments.create();

    expect(self).toMatchSnapshot();
  });

  test('open() changes value for isOpen and wasOpen to true', () => {
    const self = comments.create();

    Object.defineProperty(self, 'open', {
      writable: true,
      value: jest.fn(self.open),
    });

    self.open();

    expect(self.open).toHaveBeenCalled();
    expect(self.isOpen).toBe(true);
    expect(self.wasOpen).toBe(true);
    expect(self).toMatchSnapshot();
  });

  test('close() changes value for isOpen to false', () => {
    const self = comments.create({ isOpen: true, wasOpen: true });

    Object.defineProperty(self, 'close', {
      writable: true,
      value: jest.fn(self.close),
    });

    expect(self.isOpen).toBe(true);
    expect(self.wasOpen).toBe(true);

    self.close();

    expect(self.close).toHaveBeenCalled();
    expect(self.isOpen).toBe(false);
    expect(self.wasOpen).toBe(true);
    expect(self).toMatchSnapshot();
  });

  test('addComments() adds a comment succesfully', () => {
    const self = base.create();
    const type = 'post';
    const id = '1';

    Object.defineProperty(self, 'addComments', {
      writable: true,
      value: jest.fn(self.addComments),
    });

    expect(self.commentsMap.get(type)).toBe(undefined);

    self.addComments(type, id);

    expect(self.addComments).toHaveBeenCalled();
    expect(self.commentsMap.get(type)).not.toBe(undefined);
    expect(self.commentsMap.get(type).get(id)).not.toBe(undefined);
    expect(self.commentsMap.get(type).get(id).isOpen).toBe(false);
    expect(self.commentsMap.get(type).get(id).wasOpen).toBe(false);
    expect(self).toMatchSnapshot();
  });

  test('comments() gets a comment succesfully ', () => {
    const self = base.create({
      commentsMap: {
        post: {
          '1': {
            isOpen: false,
            wasOpen: false,
          },
        },
      },
    });
    const type = 'post';
    const id = '1';

    Object.defineProperty(self, 'comments', {
      writable: true,
      value: jest.fn(self.comments),
    });
    Object.defineProperty(self, 'addComments', {
      writable: true,
      value: jest.fn(),
    });

    expect(self.commentsMap.get(type).get(id)).toEqual({
      isOpen: false,
      wasOpen: false,
    });
    expect(self.comments(type, id)).toEqual({
      isOpen: false,
      wasOpen: false,
    });
    expect(self.addComments).not.toHaveBeenCalled();
    expect(self).toMatchSnapshot();
  });

  test("comments() adds a comment if it didn't exist before", () => {
    const self = base.create();
    const type = 'post';
    const id = '1';

    Object.defineProperty(self, 'comments', {
      writable: true,
      value: jest.fn(self.comments),
    });
    Object.defineProperty(self, 'addComments', {
      writable: true,
      value: jest.fn(self.addComments),
    });

    expect(self.commentsMap.get(type)).toBe(undefined);

    const comment = self.comments(type, id);

    expect(self.addComments).toHaveBeenCalledWith(type, id);
    expect(comment).toEqual({
      isOpen: false,
      wasOpen: false,
    });
    expect(self).toMatchSnapshot();
  });
});

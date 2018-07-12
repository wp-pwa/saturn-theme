import lang from '../lang';
import * as languages from '../languages';

describe('Theme › Shared › Stores › Lang', () => {
  test('store has `default`, `current` and `code` props', () => {
    const self = lang.create();

    expect(self.default).not.toBe(undefined);
    expect(self.current).not.toBe(undefined);
    expect(self.code).not.toBe(undefined);
    expect(self).toMatchSnapshot();
  });

  test('`default` language should be English', () => {
    const self = lang.create();

    expect(self.default).toEqual(languages.en);
  });

  test('default language `code` should be English', () => {
    const self = lang.create();

    expect(self.code).toBe('en');
  });

  test('`setLang` should change the value of `current` and `code` to Spanish', () => {
    const self = lang.create();

    expect(self.current).toEqual({});
    expect(self.code).toBe('en');

    self.setLang('es');

    expect(self.current).toEqual(languages.es);
    expect(self.code).toBe('es');
    expect(self).toMatchSnapshot();
  });

  test('`setLang` should change the value of `current` to an empty object if the code provided is not available', () => {
    const self = lang.create({
      current: languages.es,
      code: 'es',
    });

    expect(self.current).toEqual(languages.es);
    expect(self.code).toBe('es');

    self.setLang('ar');

    expect(self.current).toEqual({});
    expect(self.code).toBe('ar');
    expect(self).toMatchSnapshot();
  });

  test('`get` retrieves the string from the `default` language when that string is not available in `current`', () => {
    const self = lang.create();
    const str = self.get('loadMore');

    expect(str).toBe('Load more');
  });

  test('`get` retrieves the string from the `current` language if available', () => {
    const self = lang.create();
    self.setLang('es');
    const str = self.get('loadMore');

    expect(str).toBe('Cargar más');
  });

  test('`getReadingTime` returns a string in singular with the time provided', () => {
    const self = lang.create();
    const str = self.getReadingTime(1);

    expect(str).toBe('1 minute');
  });

  test('`getReadingTime` returns a string in plural with the time provided', () => {
    const self = lang.create();
    const str = self.getReadingTime(10);

    expect(str).toBe('10 minutes');
  });

  test('`getShares` returns a string in singular', () => {
    const self = lang.create();
    const str = self.getShares(1);

    expect(str).toBe('Share');
  });

  test('`getShares` returns a string in plural', () => {
    const self = lang.create();
    const str = self.getShares(2);

    expect(str).toBe('Shares');
  });

  test('`getSharesWithNumber` returns a string in singular with the number provided', () => {
    const self = lang.create();
    const str = self.getSharesWithNumber(1);

    expect(str).toBe('1 share');
  });

  test('`getSharesWithNumber` returns a string in plural with the number provided', () => {
    const self = lang.create();
    const str = self.getSharesWithNumber(5);

    expect(str).toBe('5 shares');
  });

  test('`getMoreInCategory` returns a string in with the category provided', () => {
    const self = lang.create();
    const str = self.getMoreInCategory('Pachachos');

    expect(str).toBe('More in Pachachos');
  });
});

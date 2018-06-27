import Nprogress from 'nprogress';
import progress from '../progress';

jest.mock('nprogress');

describe('Theme › Flows › PWA › Client › Progress', () => {
  test('Is not triggered', () => {
    const next = jest.fn();
    const call = { name: 'NOT_routeChangeSucceed' };

    progress(call, next);

    expect(next).toHaveBeenCalledWith(call);
    expect(Nprogress.done).not.toHaveBeenCalled();
    expect(Nprogress.remove).not.toHaveBeenCalled();
  });

  test('Is triggered', () => {
    const next = jest.fn();
    const call = { name: 'routeChangeSucceed' };

    progress(call, next);

    expect(next).toHaveBeenCalledWith(call);
    expect(Nprogress.done).toHaveBeenCalled();
    expect(Nprogress.remove).toHaveBeenCalled();
  });
});

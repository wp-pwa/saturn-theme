import Nprogress from 'nprogress';

export default (call, next) => {
  if (call.name === 'routeChangeSucceed') {
    Nprogress.done();
    Nprogress.remove();
  }

  next(call);
};

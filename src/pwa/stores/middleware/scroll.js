export default (call, next) => {
  if (call.name === 'routeChangeSucceed') {
    call.tree.theme.scroll.setRouteChanged(true);
  }

  next(call);
};

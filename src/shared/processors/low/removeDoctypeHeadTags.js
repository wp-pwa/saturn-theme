export default {
  test: ({ component }) => ['!doctype', 'head'].includes(component),
  process: () => null,
};
